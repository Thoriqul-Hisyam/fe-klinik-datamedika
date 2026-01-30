"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Save } from "lucide-react";

export default function GeneralSettingsPage() {
  const [faskesName, setFaskesName] = useState("Klinik DataMedika");
  const [faskesDesc, setFaskesDesc] = useState(
    "Klinik modern dengan pelayanan prima dan fasilitas lengkap."
  );
  const [primaryColor, setPrimaryColor] = useState("#00C49F"); // From globals css (approx)
  const [hoverColor, setHoverColor] = useState("#00A485");
  const [activeColor, setActiveColor] = useState("#008F72");
  const [secondaryColor, setSecondaryColor] = useState("#F0FDFA");

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Pengaturan berhasil disimpan!");
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan Umum</h1>
          <p className="text-muted-foreground">
            Kelola identitas dan tampilan aplikasi fasilitas kesehatan Anda.
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Informasi Fasilitas Kesehatan</CardTitle>
              <CardDescription>
                Detail utama yang akan ditampilkan pada dashboard dan laporan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Faskes</Label>
                <Input
                  id="name"
                  value={faskesName}
                  onChange={(e) => setFaskesName(e.target.value)}
                  placeholder="Contoh: Klinik Sehat Sentosa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={faskesDesc}
                  onChange={(e) => setFaskesDesc(e.target.value)}
                  placeholder="Deskripsi singkat tentang faskes..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Faskes</CardTitle>
              <CardDescription>
                Upload logo resmi (Format: PNG, JPG max 2MB).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="w-full max-w-xs space-y-2">
                <Input type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground text-center">
                  Disarankan ukuran 512x512px
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tema & Warna</CardTitle>
            <CardDescription>
              Sesuaikan warna aplikasi dengan branding fasilitas kesehatan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-20 p-1 cursor-pointer"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-24 font-mono text-xs"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Main brand color.</p>
              </div>

              <div className="space-y-2">
                <Label>Hover Color</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: hoverColor }}
                  />
                  <Input
                    type="color"
                    value={hoverColor}
                    onChange={(e) => setHoverColor(e.target.value)}
                    className="h-10 w-20 p-1 cursor-pointer"
                  />
                  <Input
                    value={hoverColor}
                    onChange={(e) => setHoverColor(e.target.value)}
                    className="w-24 font-mono text-xs"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Interactive state.</p>
              </div>

              <div className="space-y-2">
                <Label>Active Color</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: activeColor }}
                  />
                  <Input
                    type="color"
                    value={activeColor}
                    onChange={(e) => setActiveColor(e.target.value)}
                    className="h-10 w-20 p-1 cursor-pointer"
                  />
                  <Input
                    value={activeColor}
                    onChange={(e) => setActiveColor(e.target.value)}
                    className="w-24 font-mono text-xs"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Active/Pressed state.</p>
              </div>

              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <Input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-10 w-20 p-1 cursor-pointer"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-24 font-mono text-xs"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Subtle backgrounds.</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-4 text-sm font-medium">Preview Tampilan</h3>
              <div className="flex gap-4 rounded-lg border p-4 flex-wrap">
                <Button
                  style={{
                    backgroundColor: primaryColor,
                    color: "#fff",
                  }}
                >
                  Primary Button
                </Button>
                <Button
                  style={{
                    backgroundColor: hoverColor,
                    color: "#fff",
                  }}
                >
                  Hover State
                </Button>
                <Button
                  style={{
                    backgroundColor: activeColor,
                    color: "#fff",
                  }}
                >
                  Active State
                </Button>
                <Button
                  variant="outline"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                >
                  Outline Button
                </Button>
                <div
                  className="flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
                  style={{
                    backgroundColor: secondaryColor,
                    color: primaryColor,
                  }}
                >
                  Secondary Badge
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
