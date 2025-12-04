export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  link?: string;
  tags: string[];
}

export interface Craft {
  id: string;
  title: string;
  type: 'component' | 'animation' | 'experiment';
  videoUrl?: string; // Placeholder for video
  preview?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
