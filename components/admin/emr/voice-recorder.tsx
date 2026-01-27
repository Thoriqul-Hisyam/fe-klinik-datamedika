"use client";

import { useState } from "react";
import {
  Mic,
  Sparkles,
  Trash2,
  User,
  Stethoscope,
  Loader2,
  AlertCircle,
  Clock,
  Play,
  Square,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAudioRecorder } from "@/hooks/use-voice-recorder";

interface SoapData {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  type: string;
}

interface ConversationEntry {
  speaker: "DOKTER" | "PASIEN";
  text: string;
}

interface VoiceRecorderProps {
  onSoapGenerated: (soap: SoapData, medications?: Medication[]) => void;
}

export function VoiceRecorder({ onSoapGenerated }: VoiceRecorderProps) {
  const {
    isRecording,
    isSupported,
    audioBlob,
    recordingDuration,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [transcription, setTranscription] = useState<string>("");
  const [medications, setMedications] = useState<Medication[]>([]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProcessAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    setProcessError(null);
    setConversation([]);
    setTranscription("");
    setMedications([]);

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("/api/generate-soap", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memproses audio");
      }

      if (data.success) {
        setTranscription(data.transcription || "");
        setConversation(data.conversation || []);
        setMedications(data.medications || []);
        
        if (data.soap) {
          onSoapGenerated(data.soap, data.medications || []);
        }

        if (data.warning) {
          setProcessError(data.warning);
        }
      }
    } catch (err) {
      setProcessError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    clearRecording();
    setConversation([]);
    setTranscription("");
    setMedications([]);
    setProcessError(null);
  };

  if (!isSupported) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Browser Tidak Didukung</p>
              <p className="text-sm text-muted-foreground">
                Fitur perekaman suara memerlukan browser modern (Chrome, Edge, Firefox, Safari).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="text-sm font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-primary" />
            <span>REKAM PERCAKAPAN</span>
            <Badge variant="secondary" className="text-[9px] font-normal">
              Automatic SOAP
            </Badge>
          </div>
          {(audioBlob || conversation.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Instructions */}
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          <p className="font-medium mb-1.5">Tips Rekaman Jernih:</p>
          <ul className="space-y-1 text-[11px]">
            <li>• Gunakan mikrofon eksternal atau headset untuk hasil terbaik</li>
            <li>• Bicara dengan jelas dan jangan terlalu cepat</li>
            <li>• Hindari background noise (AC, kipas, dll)</li>
            <li>• Jarak mikrofon ±30cm dari mulut</li>
          </ul>
        </div>

        {/* Record Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                size="lg"
                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-md"
              >
                <Mic className="h-7 w-7" />
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                size="lg"
                className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 animate-pulse"
              >
                <Square className="h-6 w-6 fill-current" />
              </Button>
            )}

            {!isRecording && audioBlob && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={startRecording}
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 rounded-full"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Rekam Ulang
                </Button>
              </div>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center gap-2 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <Clock className="h-4 w-4" />
              <span className="text-sm font-mono font-bold">{formatDuration(recordingDuration)}</span>
              <span className="text-xs">Merekam...</span>
            </div>
          )}

          {!isRecording && audioBlob && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Play className="h-4 w-4" />
              <span className="text-sm">Rekaman siap ({formatDuration(recordingDuration)})</span>
            </div>
          )}

          {!isRecording && !audioBlob && (
            <span className="text-xs text-muted-foreground">
              Tekan untuk mulai merekam
            </span>
          )}
        </div>

        {/* Process Button */}
        {!isRecording && audioBlob && (
          <Button
            onClick={handleProcessAudio}
            disabled={isProcessing}
            className="w-full shadow-lg"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Memproses dengan AI...
              </>
            ) : (
              <>
                {/* <Sparkles className="h-4 w-4 mr-2" /> */}
                <p>Proses & Generate SOAP</p>
              </>
            )}
          </Button>
        )}

        {/* Conversation Result */}
       {/* {conversation.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> 
              Hasil Identifikasi Speaker
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {conversation.map((entry, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2 p-2.5 rounded-lg text-sm",
                    entry.speaker === "DOKTER"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-l-2 border-emerald-500"
                      : "bg-blue-50 dark:bg-blue-950/30 border-l-2 border-blue-500"
                  )}
                >
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] font-bold shrink-0",
                      entry.speaker === "DOKTER"
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"
                        : "bg-blue-500/10 text-blue-700 border-blue-500/30"
                    )}
                  >
                    {entry.speaker === "DOKTER" ? (
                      <Stethoscope className="h-2.5 w-2.5 mr-1" />
                    ) : (
                      <User className="h-2.5 w-2.5 mr-1" />
                    )}
                    {entry.speaker}
                  </Badge>
                  <p className="flex-1 leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}*/}

        {/* Medication Recommendations */}
        {medications.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Pill className="h-3 w-3" />
              Rekomendasi Obat
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[10px]">
                        {med.type || "Obat"}
                      </Badge>
                      <span className="font-bold text-sm text-amber-900 dark:text-amber-100">
                        {med.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded">
                      {med.dosage}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-amber-800 dark:text-amber-200">
                    <div>
                      <span className="text-amber-600 dark:text-amber-400">Frekuensi:</span>{" "}
                      {med.frequency}
                    </div>
                    <div>
                      <span className="text-amber-600 dark:text-amber-400">Durasi:</span>{" "}
                      {med.duration}
                    </div>
                  </div>
                  {med.instructions && (
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 italic">
                      📝 {med.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw Transcription (fallback) */}
        {transcription && conversation.length === 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Transkripsi
            </p>
            <div className="p-3 rounded-lg bg-muted/50 text-sm">
              {transcription}
            </div>
          </div>
        )}

        {/* Error Messages */}
        {(error || processError) && (
          <div className={cn(
            "flex items-start gap-2 p-3 rounded-lg text-sm",
            processError?.includes("warning") 
              ? "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700"
              : "bg-destructive/10 text-destructive"
          )}>
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error || processError}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
