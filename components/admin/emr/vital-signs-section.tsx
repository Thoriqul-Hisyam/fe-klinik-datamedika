"use client";

import { useState, useEffect } from "react";
import { Save, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Mock history data
const vitalHistory = [
  {
    id: 1,
    timestamp: "2026-01-20 09:30",
    sistole: 130,
    diastole: 85,
    heartRate: 88,
    respRate: 20,
    temp: 38.5,
    spo2: 97,
    weight: 75,
    height: 170,
    bmi: 26.0,
    user: "dr. Sarah",
  },
  {
    id: 2,
    timestamp: "2026-01-15 10:15",
    sistole: 125,
    diastole: 82,
    heartRate: 78,
    respRate: 18,
    temp: 36.8,
    spo2: 98,
    weight: 75,
    height: 170,
    bmi: 26.0,
    user: "dr. Ahmad",
  },
  {
    id: 3,
    timestamp: "2026-01-10 08:45",
    sistole: 135,
    diastole: 88,
    heartRate: 92,
    respRate: 22,
    temp: 37.2,
    spo2: 96,
    weight: 76,
    height: 170,
    bmi: 26.3,
    user: "dr. Sarah",
  },
];

interface VitalFormData {
  sistole: string;
  diastole: string;
  heartRate: string;
  respRate: string;
  temp: string;
  spo2: string;
  weight: string;
  height: string;
}

export function VitalSignsSection() {
  const [formData, setFormData] = useState<VitalFormData>({
    sistole: "",
    diastole: "",
    heartRate: "",
    respRate: "",
    temp: "",
    spo2: "",
    weight: "",
    height: "",
  });

  const [bmi, setBmi] = useState<string>("");

  // Auto-calculate BMI
  useEffect(() => {
    const weight = parseFloat(formData.weight);
    const heightCm = parseFloat(formData.height);
    if (weight > 0 && heightCm > 0) {
      const heightM = heightCm / 100;
      const calculatedBmi = weight / (heightM * heightM);
      setBmi(calculatedBmi.toFixed(1));
    } else {
      setBmi("");
    }
  }, [formData.weight, formData.height]);

  const handleInputChange = (field: keyof VitalFormData, value: string) => {
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    console.log("Saving vitals:", { ...formData, bmi });
    // Reset form after save
    setFormData({
      sistole: "",
      diastole: "",
      heartRate: "",
      respRate: "",
      temp: "",
      spo2: "",
      weight: "",
      height: "",
    });
  };

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "text-blue-600" };
    if (bmiValue < 25) return { label: "Normal", color: "text-green-600" };
    if (bmiValue < 30) return { label: "Overweight", color: "text-orange-600" };
    return { label: "Obese", color: "text-red-600" };
  };

  const isFormValid =
    formData.sistole &&
    formData.diastole &&
    formData.heartRate &&
    formData.respRate &&
    formData.temp &&
    formData.spo2;

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Input Tanda Vital</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {new Date().toLocaleString("id-ID")}
          </div>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Blood Pressure */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-xs text-muted-foreground">
              Tekanan Darah
            </Label>
            <div className="flex items-center gap-1 mt-1">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="120"
                value={formData.sistole}
                onChange={(e) => handleInputChange("sistole", e.target.value)}
                className="h-9 text-center"
              />
              <span className="text-muted-foreground">/</span>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="80"
                value={formData.diastole}
                onChange={(e) => handleInputChange("diastole", e.target.value)}
                className="h-9 text-center"
              />
              <span className="text-xs text-muted-foreground w-12">mmHg</span>
            </div>
          </div>

          {/* Heart Rate */}
          <VitalInput
            label="Heart Rate"
            unit="bpm"
            placeholder="80"
            value={formData.heartRate}
            onChange={(v) => handleInputChange("heartRate", v)}
          />

          {/* Respiratory Rate */}
          <VitalInput
            label="Resp. Rate"
            unit="x/mnt"
            placeholder="18"
            value={formData.respRate}
            onChange={(v) => handleInputChange("respRate", v)}
          />

          {/* Temperature */}
          <VitalInput
            label="Suhu"
            unit="°C"
            placeholder="36.5"
            value={formData.temp}
            onChange={(v) => handleInputChange("temp", v)}
          />

          {/* SpO2 */}
          <VitalInput
            label="SpO2"
            unit="%"
            placeholder="98"
            value={formData.spo2}
            onChange={(v) => handleInputChange("spo2", v)}
          />

          {/* Weight */}
          <VitalInput
            label="Berat Badan"
            unit="kg"
            placeholder="70"
            value={formData.weight}
            onChange={(v) => handleInputChange("weight", v)}
          />

          {/* Height */}
          <VitalInput
            label="Tinggi Badan"
            unit="cm"
            placeholder="170"
            value={formData.height}
            onChange={(v) => handleInputChange("height", v)}
          />

          {/* BMI (Auto-calculated) */}
          <div>
            <Label className="text-xs text-muted-foreground">BMI</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-9 flex-1 rounded-lg border bg-muted/50 px-3 flex items-center">
                <span className={cn("font-medium", bmi && getBmiCategory(parseFloat(bmi)).color)}>
                  {bmi || "-"}
                </span>
              </div>
              {bmi && (
                <Badge
                  variant="outline"
                  className={cn("text-[10px]", getBmiCategory(parseFloat(bmi)).color)}
                >
                  {getBmiCategory(parseFloat(bmi)).label}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSave} disabled={!isFormValid}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Tanda Vital
          </Button>
        </div>
      </div>

      {/* History Table */}
      <div>
        <h3 className="text-sm font-medium mb-3">Riwayat Tanda Vital</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[10px] h-8 whitespace-nowrap">Waktu</TableHead>
                <TableHead className="text-[10px] h-8 text-center">TD</TableHead>
                <TableHead className="text-[10px] h-8 text-center">HR</TableHead>
                <TableHead className="text-[10px] h-8 text-center">RR</TableHead>
                <TableHead className="text-[10px] h-8 text-center">Suhu</TableHead>
                <TableHead className="text-[10px] h-8 text-center">SpO2</TableHead>
                <TableHead className="text-[10px] h-8 text-center">BB</TableHead>
                <TableHead className="text-[10px] h-8 text-center">BMI</TableHead>
                <TableHead className="text-[10px] h-8">Oleh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vitalHistory.map((record, index) => {
                const prevRecord = vitalHistory[index + 1];
                return (
                  <TableRow key={record.id} className="text-xs">
                    <TableCell className="py-2 whitespace-nowrap text-muted-foreground">
                      {record.timestamp}
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      <TrendIndicator
                        current={record.sistole}
                        previous={prevRecord?.sistole}
                      />
                      {record.sistole}/{record.diastole}
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      {record.heartRate}
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      {record.respRate}
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      {record.temp}°
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      {record.spo2}%
                    </TableCell>
                    <TableCell className="py-2 text-center font-mono">
                      {record.weight}
                    </TableCell>
                    <TableCell className="py-2 text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1",
                          getBmiCategory(record.bmi).color
                        )}
                      >
                        {record.bmi}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2 text-muted-foreground">
                      {record.user}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function VitalInput({
  label,
  unit,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <Input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || /^\d*\.?\d*$/.test(v)) {
              onChange(v);
            }
          }}
          className="h-9"
        />
        <span className="text-xs text-muted-foreground w-10">{unit}</span>
      </div>
    </div>
  );
}

function TrendIndicator({
  current,
  previous,
}: {
  current: number;
  previous?: number;
}) {
  if (!previous) return null;
  if (current > previous) {
    return <TrendingUp className="h-3 w-3 text-red-500 inline mr-1" />;
  }
  if (current < previous) {
    return <TrendingDown className="h-3 w-3 text-green-500 inline mr-1" />;
  }
  return null;
}
