# Daniel Bartholdy — Portfolio

A personal developer portfolio built with **Angular 22**, showcasing professional experience, projects and background. Built as part of a Java + Angular immersion, using it as an opportunity to apply modern Angular concepts end-to-end — standalone components, the new control-flow syntax, and a fully data-driven content architecture.

**Live demo:** https://bartholdy-portfolio.vercel.app
**Author:** [Daniel Henrique Bartholdy](https://linkedin.com/in/daniel-bartholdy)

---

## About the project

This portfolio was originally forked from [felipeAguiarCode/angular-blog](https://github.com/felipeAguiarCode/angular-blog) as the base for a hands-on Angular challenge, then extended and rebuilt with original content, layout and structure.

Rather than hardcoding content into templates, every section of the site — hero, about, experience, certifications, projects and contact — is driven by strongly-typed data models and backend responses, making the whole portfolio easy to update without touching component logic.

## Features

- **Hero** — quick introduction and call to action
- **About** — a short personal summary
- **Experience** — a detailed, timeline-style history of professional roles
- **Certifications** — certifications and education loaded from the backend API
- **Projects** — a grid of featured projects with dedicated detail pages, pulled from real GitHub repositories
- **Contact** — quick links to email, LinkedIn and GitHub
- Fully responsive layout
- Component-based architecture with reusable, typed data models

## Tech stack

| Category | Technology |
| --- | --- |
| Framework | [Angular 22](https://angular.dev) (standalone components, new control flow) |
| Language | TypeScript |
| Styling | SCSS |
| Testing | [Vitest](https://vitest.dev) |
| Tooling | Angular CLI, Prettier |

## Project structure

```
src/app/
├── components/       # Reusable UI building blocks (hero, about, experience, projects-grid, contact, header, footer)
├── data/             # Typed content for every section (hero.ts, about.ts, experience.ts, projects.ts, contacts.ts, navigation.ts)
├── models/            # API transport models
├── pages/            # Route-level pages (home, project-details)
├── services/          # API clients, HTTP error handling, loading and theme services
├── environments/      # Runtime configuration such as the API base URL
├── app.routes.ts      # Application routes
└── app.config.ts      # Application-wide configuration
```

Content lives entirely in `src/app/data/`. To update a section — add a new role to Experience, or a new entry to Projects — edit the corresponding data file; no template changes required.

### API infrastructure

The Angular API base URL is centralized in the environment files. Local development uses `http://localhost:8080/api/v1` from `src/environments/environment.ts`. Production builds generate the ignored `src/environments/environment.prod.ts` from the `API_URL` environment variable before compiling. `HttpClient` is configured during application bootstrap.

Technology icon URLs are prepared by `TechnologyService` using `/icons/technologies/{slug}.svg`. HTTP failures are normalized by the global interceptor and `HttpErrorHandlerService`; `LoadingService` provides reusable request tracking for future page integration.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/dhbart/angular-blog.git
cd angular-blog
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Build

```bash
$env:API_URL = "https://portfolio-api-g6au.onrender.com/api/v1"
npm run build
```

Compiles the project and outputs production-ready artifacts to `dist/`.

For Vercel, add `API_URL` under Project Settings > Environment Variables with the value `https://portfolio-api-g6au.onrender.com/api/v1`. Vercel then provides it automatically during `npm run build`.

SEO metadata is centralized in `src/app/core/seo/seo.service.ts`. It updates localized titles, descriptions, canonical URLs, Open Graph, Twitter Cards and the document language for every route. `public/robots.txt`, `public/sitemap.xml`, `public/manifest.webmanifest` and `public/favicon.ico` are copied to the production output.

### Tests

```bash
npm test
```

Runs unit tests with Vitest.

## Roadmap

- [ ] Add project screenshots / preview images
- [ ] Deploy and link a live demo
- [ ] Dark / light theme toggle

## Acknowledgments

Based on the base project from the DIO Bootcamp Java + Angular immersion, forked from [felipeAguiarCode/angular-blog](https://github.com/felipeAguiarCode/angular-blog).

## Contact

- **LinkedIn:** [linkedin.com/in/daniel-bartholdy](https://linkedin.com/in/daniel-bartholdy)
- **GitHub:** [github.com/dhbart](https://github.com/dhbart)
