"use client";

import { useState, useRef, useCallback } from "react";

interface UseAudioRecorderReturn {
  isRecording: boolean;
  isSupported: boolean;
  audioBlob: Blob | null;
  recordingDuration: number;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setAudioBlob(null);
      setRecordingDuration(0);
      chunksRef.current = [];

      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setIsSupported(false);
        setError("Browser Anda tidak mendukung fitur perekaman audio.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,           // Mono for speech
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,     // Normalize volume
          sampleRate: 16000,         // 16kHz optimal for Whisper
        } 
      });

      // Use WAV-like format for better compatibility
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/ogg;codecs=opus';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/mp4';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
              mimeType = ''; // Use browser default
            }
          }
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType: mimeType || undefined,
        audioBitsPerSecond: 128000,  // Higher bitrate for clarity
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
        setAudioBlob(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      mediaRecorder.onerror = () => {
        setError("Terjadi kesalahan saat merekam.");
        setIsRecording(false);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);

      // Start duration timer
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Recording error:", err);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setError("Izin mikrofon ditolak. Mohon berikan izin untuk menggunakan mikrofon.");
        } else if (err.name === 'NotFoundError') {
          setError("Mikrofon tidak ditemukan. Pastikan perangkat terhubung.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError("Gagal memulai perekaman.");
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const clearRecording = useCallback(() => {
    setAudioBlob(null);
    setRecordingDuration(0);
    setError(null);
    chunksRef.current = [];
  }, []);

  return {
    isRecording,
    isSupported,
    audioBlob,
    recordingDuration,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  };
}
