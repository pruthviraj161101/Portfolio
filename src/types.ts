export type LightingTheme = 'sepia' | 'amber' | 'espresso';

export interface ProfileData {
  firstName: string;
  lastName: string;
  role: string;
  year: string;
  tagline: string;
  studio: string;
  websiteTools: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  additionalLink?: string;
}

export type TabType = 'hero' | 'about' | 'work';
