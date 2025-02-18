
export interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: JSX.Element;
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  tags: string[];
  downloads?: number;
  views?: number;
}
