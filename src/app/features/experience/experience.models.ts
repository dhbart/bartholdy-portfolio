export interface ExperienceResponse {
  id: number;
  company: string;
  location: string;
  period: string;
  position: string;
  summary: string;
  description: string[];
  highlights: string[];
  technologies: string[];
  startDate: string;
  endDate: string | null;
  currentPosition: boolean;
  displayOrder: number;
}
