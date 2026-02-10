"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Printer } from "lucide-react";

interface NursingNote {
  id: string;
  tanggal: string;
  jam: string;
  catatan: string;
  petugas: string;
}

interface NursingNotesFormProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function NursingNotesForm({ noReg, patientData }: NursingNotesFormProps) {
  const [notes, setNotes] = useState<NursingNote[]>([
    {
      id: "1",
      tanggal: "2026-02-10",
      jam: "08:00",
      catatan: "Pasien mengeluh sesak napas ringan, posisi ditinggikan (semi fowler). Oksigen nasal kanul 2L/m terpasang.",
      petugas: "Ns. Maya",
    },
    {
      id: "2",
      tanggal: "2026-02-10",
      jam: "09:30",
      catatan: "Observasi tanda vital: TD 120/80, N 88, S 36.5, RR 22. Sesak berkurang.",
      petugas: "Ns. Maya",
    },
  ]);

  const [newNote, setNewNote] = useState({ catatan: "", petugas: "" });

  const addNote = () => {
    if (!newNote.catatan) return;
    const note: NursingNote = {
      id: Date.now().toString(),
      tanggal: new Date().toISOString().split("T")[0],
      jam: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
      catatan: newNote.catatan,
      petugas: newNote.petugas || "Perawat Jaga",
    };
    setNotes([note, ...notes]);
    setNewNote({ catatan: "", petugas: "" });
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Catatan Keperawatan (CPPT)",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <table class="w-full border-collapse border border-black mt-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-black p-2 text-[10px] font-bold uppercase w-32">Waktu</th>
              <th class="border border-black p-2 text-[10px] font-bold uppercase">Catatan Keperawatan</th>
              <th class="border border-black p-2 text-[10px] font-bold uppercase w-32">Paraf / Nama</th>
            </tr>
          </thead>
          <tbody>
            ${notes.map(note => `
              <tr>
                <td class="border border-black p-2 text-[10px]">
                  <strong>${note.tanggal}</strong><br/>
                  ${note.jam}
                </td>
                <td class="border border-black p-2 text-xs leading-relaxed">
                  ${note.catatan}
                </td>
                <td class="border border-black p-2 text-[10px] font-bold text-center">
                  ${note.petugas}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `
    };

    sessionStorage.setItem("lastEMRPrintData", JSON.stringify(printData));
    window.open("/emr-print", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Catatan Keperawatan (CPPT)</h3>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Note
        </Button>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <Textarea 
            placeholder="Ketik catatan keperawatan di sini..." 
            value={newNote.catatan}
            onChange={(e) => setNewNote({ ...newNote, catatan: e.target.value })}
            className="min-h-[100px] rounded-xl border-muted-foreground/20"
          />
          <div className="flex gap-3">
            <Input 
              placeholder="Nama Petugas" 
              value={newNote.petugas}
              onChange={(e) => setNewNote({ ...newNote, petugas: e.target.value })}
              className="w-64 rounded-xl border-muted-foreground/20"
            />
            <Button onClick={addNote} className="rounded-xl gap-2 font-bold px-6">
              <Plus className="h-4 w-4" />
              Simpan Catatan
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px] text-[10px] font-bold uppercase tracking-wider">Waktu</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Catatan Keperawatan</TableHead>
              <TableHead className="w-[150px] text-[10px] font-bold uppercase tracking-wider">Petugas</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id} className="hover:bg-primary/5 transition-colors">
                <TableCell className="font-mono text-[11px] align-top">
                  <div className="font-bold">{note.tanggal}</div>
                  <div className="text-muted-foreground">{note.jam}</div>
                </TableCell>
                <TableCell className="text-sm leading-relaxed whitespace-pre-wrap">
                  {note.catatan}
                </TableCell>
                <TableCell className="align-top font-medium text-xs text-primary">
                  {note.petugas}
                </TableCell>
                <TableCell className="align-top">
                  <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
