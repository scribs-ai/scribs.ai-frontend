import { config } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSourceUrl(src: string) {
  return `${config.base_url}${src}`;
}

export function getTime() {
  return new Date(Date.now() + 60000 * 360);
}
