export const projects = [
  {
    id: 'portfolio',
    title: 'Bartholdy Portfolio',
    featured: true,

    headline: 'A modern portfolio built with Angular 22.',

    description:
      'Personal portfolio inspired by modern developer websites.',

    image: "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png",
    //image: '/images/projects/movie-api.png',


    technologies: [
      'Angular',
      'TypeScript',
      'SCSS'
    ],

    challenge:
      'Create a professional portfolio while applying modern Angular concepts.',

    solution:
      'The application was built with Standalone Components, the new Control Flow syntax, a reusable Design System and a component-based architecture.',

    github: '#',
    demo: '#'
  },

  {
    id: 'movie-api',

    featured: false,

    title: 'Movie API',

    headline: 'An API for browsing and searching movies.',

    description: 'A REST API for browsing and searching movies.',

    image: "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png",
    //image: '/images/projects/movie-api.png',

    technologies: [
      'Java',
      'Spring Boot',
      'MySQL'
    ],

    challenge:
      'Create a professional portfolio while applying modern Angular concepts.',

    solution:
      'The application was built with Standalone Components, the new Control Flow syntax, a reusable Design System and a component-based architecture.',


    github: '#'
  },

  {
    id: 'bootcamp',

    featured: false,

    title: 'Santander Bootcamp',

    headline: 'An API for browsing and searching movies.',

    description: 'A project developed during the Santander Bootcamp.',

    image: "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png",
    //image: '/images/projects/movie-api.png',

    technologies: [
      'Java',
      'Spring Boot',
      'PostgreSQL'
    ],

    challenge:
      'Create a professional portfolio while applying modern Angular concepts.',

    solution:
      'The application was built with Standalone Components, the new Control Flow syntax, a reusable Design System and a component-based architecture.',


    github: '#'
  }
];

export function getProjectById(id: string | null) {
  return projects.find(project => project.id === id);
}
