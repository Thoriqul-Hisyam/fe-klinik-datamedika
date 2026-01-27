import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import Groq from "groq-sdk";

// Initialize clients
const hfClient = new InferenceClient(process.env.HF_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "File audio tidak ditemukan" },
        { status: 400 }
      );
    }

    // Check for at least one API key
    const hasGroqKey = !!process.env.GROQ_API_KEY;
    const hasHfKey = !!process.env.HF_TOKEN;

    if (!hasGroqKey && !hasHfKey) {
      return NextResponse.json(
        { error: "API key tidak dikonfigurasi. Set GROQ_API_KEY atau HF_TOKEN di .env.local" },
        { status: 500 }
      );
    }

    const audioBuffer = await audioFile.arrayBuffer();
    let transcription: string = "";

    // Try Groq first (faster and more reliable)
    if (hasGroqKey) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        
        // Convert ArrayBuffer to File for Groq
        const audioBlob = new Blob([audioBuffer], { type: audioFile.type });
        const file = new File([audioBlob], "audio.webm", { type: audioFile.type });

        const transcriptionResult = await groq.audio.transcriptions.create({
          file: file,
          model: "whisper-large-v3-turbo",
          language: "id", // Indonesian
          response_format: "text",
        });

        transcription = typeof transcriptionResult === 'string' 
          ? transcriptionResult 
          : (transcriptionResult as { text?: string }).text || "";
          
        console.log("Groq transcription success:", transcription.substring(0, 100));
      } catch (groqError) {
        console.error("Groq transcription error:", groqError);
        // Fall through to HF if Groq fails
      }
    }

    // Fallback to HuggingFace if Groq failed or unavailable
    if (!transcription && hasHfKey) {
      try {
        const audioBlob = new Blob([audioBuffer], { type: audioFile.type });
        const result = await hfClient.automaticSpeechRecognition({
          model: "openai/whisper-large-v3",
          data: audioBlob,
        });
        transcription = result.text;
        console.log("HF transcription success:", transcription.substring(0, 100));
      } catch (hfError) {
        console.error("HuggingFace transcription error:", hfError);
      }
    }

    if (!transcription || transcription.trim() === "") {
      return NextResponse.json(
        { error: "Tidak ada suara terdeteksi atau transkripsi gagal. Pastikan rekaman jelas." },
        { status: 400 }
      );
    }

    // Step 2: Use AI to analyze and create SOAP with speaker identification
    if (!hasHfKey) {
      // Return just transcription if no HF key for AI analysis
      return NextResponse.json({
        success: true,
        transcription: transcription,
        conversation: [],
        soap: {
          subjective: transcription,
          objective: "",
          assessment: "",
          plan: "",
        },
        warning: "HF_TOKEN tidak tersedia. Transkripsi berhasil, tapi analisis AI tidak bisa dilakukan.",
      });
    }

    const systemPrompt = `Anda adalah asisten medis profesional Indonesia yang sangat berpengalaman.

TUGAS ANDA:
1. Analisis transkripsi percakapan dokter-pasien berikut
2. Identifikasi secara otomatis mana yang merupakan ucapan DOKTER dan mana yang merupakan ucapan PASIEN berdasarkan konteks:
   - PASIEN biasanya: menceritakan keluhan, menjawab pertanyaan, mendeskripsikan gejala
   - DOKTER biasanya: bertanya, melakukan anamnesis, memberikan diagnosis, memberikan instruksi pengobatan
3. Buat catatan SOAP yang lengkap dalam Bahasa Indonesia
4. Berikan REKOMENDASI OBAT yang sesuai dengan diagnosis

PANDUAN SOAP:
- **Subjective (S)**: Keluhan utama pasien, riwayat penyakit sekarang, riwayat alergi/penyakit dahulu
- **Objective (O)**: Temuan pemeriksaan fisik, tanda vital, hasil lab yang disebutkan
- **Assessment (A)**: Diagnosis kerja atau diagnosis banding
- **Plan (P)**: Rencana terapi, tindakan, edukasi, dan jadwal kontrol

PANDUAN REKOMENDASI OBAT:
- Berikan nama obat generik dan/atau nama dagang yang umum di Indonesia
- Sertakan dosis, frekuensi, dan durasi pemberian
- Sesuaikan dengan diagnosis dan kondisi pasien
- Jika ada kontraindikasi yang disebutkan (alergi, dll), hindari obat tersebut

Format output HARUS berupa JSON valid:
{
  "conversation": [
    {"speaker": "PASIEN", "text": "..."},
    {"speaker": "DOKTER", "text": "..."}
  ],
  "soap": {
    "subjective": "...",
    "objective": "...",
    "assessment": "...",
    "plan": "..."
  },
  "medications": [
    {
      "name": "Nama Obat",
      "dosage": "Dosis (contoh: 500mg)",
      "frequency": "Frekuensi (contoh: 3x sehari)",
      "duration": "Durasi (contoh: 5 hari)",
      "instructions": "Instruksi tambahan (contoh: setelah makan)",
      "type": "Jenis (tablet/sirup/kapsul/injeksi/dll)"
    }
  ]
}

PENTING: Output HANYA JSON murni, tanpa markdown atau teks tambahan.`;

    const chatCompletion = await hfClient.chatCompletion({
      model: "moonshotai/Kimi-K2-Instruct:novita",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Berikut adalah transkripsi percakapan di ruang praktik dokter:\n\n"${transcription}"\n\nAnalisis dan identifikasi speaker, lalu buat SOAP note dalam format JSON.`,
        },
      ],
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;

    if (!responseContent) {
      return NextResponse.json({
        success: true,
        transcription: transcription,
        conversation: [],
        soap: {
          subjective: transcription,
          objective: "",
          assessment: "",
          plan: "",
        },
        warning: "AI tidak memberikan respons. Transkripsi disimpan di Subjective.",
      });
    }

    // Parse JSON from response
    try {
      let cleanedResponse = responseContent.trim();
      // Remove markdown code blocks if present
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      }
      if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();

      const data = JSON.parse(cleanedResponse);

      return NextResponse.json({
        success: true,
        transcription: transcription,
        conversation: data.conversation || [],
        soap: {
          subjective: data.soap?.subjective || "",
          objective: data.soap?.objective || "",
          assessment: data.soap?.assessment || "",
          plan: data.soap?.plan || "",
        },
        medications: data.medications || [],
      });
    } catch {
      // If JSON parsing fails, return raw transcription with basic SOAP
      return NextResponse.json({
        success: true,
        transcription: transcription,
        conversation: [],
        soap: {
          subjective: transcription,
          objective: "",
          assessment: "",
          plan: "",
        },
        warning: "AI tidak bisa mengidentifikasi speaker. Transkripsi disimpan di Subjective.",
      });
    }
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat memproses audio",
      },
      { status: 500 }
    );
  }
}
