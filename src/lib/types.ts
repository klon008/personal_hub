import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string[];
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  icon: string;
  link: string;
}
