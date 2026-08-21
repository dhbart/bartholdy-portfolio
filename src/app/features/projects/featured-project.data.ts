import { projects } from './project.data';

export const featuredProject =
    projects.find(project => project.featured);
