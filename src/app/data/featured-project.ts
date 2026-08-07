import { projects } from './projects';

export const featuredProject =
    projects.find(project => project.featured);
