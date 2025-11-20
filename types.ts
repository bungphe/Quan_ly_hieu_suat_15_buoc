export interface Step {
  id: number;
  title: string;
  shortDesc: string;
  color: string; // Tailwind color class for border/bg
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
