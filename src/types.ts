export interface Project {
  name: string; featured?: boolean; date: string; live: string;
  code: [string, string][]; image: string; color: [string, string];
  desc: string; points: string[]; stack: string[];
}
export interface Analytic { name: string; tool: string; desc: string; points: string[]; stack: string[]; }
export interface Data {
  name: string; roles: string[]; tagline: string; summary: string; location: string;
  email: string; github: string; linkedin: string; resumes: [string, string][];
  stats: [string, string][]; projects: Project[]; analytics: Analytic[];
  skills: Record<string, string[]>; education: [string, string][]; achievements: [string, string][];
}