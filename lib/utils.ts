import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNoReg(noRM: string) {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  
  const timestamp = `${YYYY}${MM}${DD}${HH}${mm}${ss}`;
  // Clean noRM (remove dashes, etc.) if needed, but here we just append it
  const cleanNoRM = noRM.replace(/-/g, "");
  return `NoReg${timestamp}${cleanNoRM}`;
}
