export interface Project {
  id: string;
  title: string;
  featured: boolean;
  headline: string;
  description: string;
  image: string;
  technologies: string[];
  challenge: string;
  solution: string;
  github?: string;
  demo?: string;
}

export interface ProjectResponse {
  id: number;
  slug: string;
  title: string;
  headline: string;
  description: string;
  challenge: string;
  solution: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  displayOrder: number;
  technologies: TechnologyResponse[];
}

export interface TechnologyResponse {
  id: number;
  name: string;
  slug: string;
  website: string;
  displayOrder: number;
}
