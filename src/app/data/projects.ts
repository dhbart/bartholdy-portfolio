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

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Bartholdy Portfolio',
    featured: false,

    headline: 'A modern portfolio built with Angular 22.',

    description:
      'Personal portfolio inspired by modern developer websites, built as part of a Java + Angular immersion challenge.',

    //image: "https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png",
    image: '/assets/images/bartholdyportfolio.png',

    technologies: [
      'Angular',
      'TypeScript',
      'SCSS'
    ],

    challenge:
      'Create a professional portfolio while applying modern Angular concepts from scratch, going beyond the base course project.',

    solution:
      'Built with Standalone Components, the new Control Flow syntax, a reusable design system and a component-based architecture, with all content driven by typed data files for easy maintenance.',

    github: 'https://github.com/dhbart/bartholdy-portfolio',
    demo: '#'
  },

  {
    id: 'budgeting',

    featured: true,

    title: 'Budgeting — Voice-Driven Finance API',

    headline: 'A personal finance API you talk to.',

    description:
      'A voice-driven personal finance API built with Spring Boot and Spring AI. It transcribes spoken audio, uses AI tool calling to execute real use cases like creating and listing transactions, and replies back with synthesized speech.',

    image: '/assets/images/budgeting.png',

    technologies: [
      'Java',
      'Spring Boot',
      'Spring AI',
      'Tool Calling',
      'Speech-to-Text',
      'Text-to-Speech'
    ],

    challenge:
      'Most finance-tracking apps still require manual form-filling. The goal was to let a user simply speak a transaction out loud — "I spent 40 on groceries" — and have the system understand, execute and confirm it, entirely by voice.',

    solution:
      'The API transcribes incoming audio, passes the resulting text to an LLM configured with Spring AI Tool Calling, which decides which backend function to invoke (create transaction, list transactions, etc.). The result is converted back into synthesized speech, closing the loop from voice in to voice out without any manual UI interaction.',

    github: 'https://github.com/dhbart/budgeting',
    demo: '#'
  },

  {
    id: 'crescer-juntos',

    featured: false,

    title: 'Crescer Juntos',

    headline: 'A family routines and rewards API, built with DDD.',

    description:
      'A REST API for managing family routines, children\'s tasks, points and rewards — built with Java 21, Spring Boot, PostgreSQL and OpenAPI, following Domain-Driven Design and Clean Architecture.',

    image: '/assets/images/crescer-juntos.png',

    technologies: [
      'Java 21',
      'Spring Boot',
      'Gradle',
      'PostgreSQL',
      'OpenAPI',
      'Domain-Driven Design'
    ],

    challenge:
      'Model a real-world domain — family routines, task assignment, point accumulation and reward redemption — in a way that keeps business rules isolated from framework and persistence details, rather than letting logic leak into controllers and entities.',

    solution:
      'Applied Domain-Driven Design and Clean Architecture to separate the domain model from infrastructure concerns, documenting the API with OpenAPI and using Gradle and PostgreSQL as the build and persistence layer. This project doubles as hands-on practice with concepts I was studying at the theory level (DDD, TDD) and had not yet applied in a production codebase.',

    github: 'https://github.com/dhbart/crescer-juntos',
    demo: '#'
  },

  {
    id: 'tickets-marketplace',

    featured: false,

    title: 'Tickets Marketplace',

    headline: 'Exploring multi-database persistence and distributed seat locking.',

    description:
      'A Spring Boot application exploring multi-database persistence (MySQL, PostgreSQL and MongoDB) with Redis caching and distributed seat locking, built during a Java backend bootcamp.',

    image: '/assets/images/ticketing.png',

    technologies: [
      'Java',
      'Spring Boot',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis'
    ],

    challenge:
      'In a ticket marketplace, two users can try to buy the same seat at the same time. The challenge was preventing that race condition — and double-booking — across a system using more than one type of database for different parts of the domain.',

    solution:
      'Implemented distributed seat locking so a seat is reserved for a single purchase flow at a time, with Redis handling caching for frequently read data. The persistence layer intentionally mixes MySQL, PostgreSQL and MongoDB to practice choosing the right database per data shape rather than defaulting to a single one.',

    github: 'https://github.com/dhbart/TicketsMarketplace',
    demo: '#'
  },

  {
    id: 'movie-api',

    featured: false,

    title: 'Movie Explorer API',

    headline: 'A movie API built around three classic design patterns.',

    description: 'A REST API built with Java 21 and Spring Boot, integrating with the TMDB API to browse and manage movies, applying the Singleton, Strategy and Facade design patterns.',

    image: '/assets/images/movie-api.png',

    technologies: [
      'Java 21',
      'Spring Boot',
      'Gradle',
      'REST API',
      'Swagger',
      'Design Patterns',
      'TMDB API'
    ],

    challenge:
      'Consume an external API (TMDB) while keeping the integration swappable and the internal service logic decoupled from any single external provider or search strategy.',

    solution:
      'Used the Facade pattern to expose a simplified interface over the TMDB integration, Strategy to allow different movie-search behaviors to be swapped without changing calling code, and Singleton for shared stateless services — documenting all endpoints with Swagger/OpenAPI.',

    github: 'https://github.com/dhbart/desafio-design-patterns',
    demo: '#'
  }
];


export function getProjectById(id: string | null): Project | undefined {
  return projects.find(project => project.id === id);
}
