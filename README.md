# Daniel Bartholdy — Portfolio

A personal developer portfolio built with **Angular 22**, showcasing professional experience, projects and background. Built as part of a Java + Angular immersion, using it as an opportunity to apply modern Angular concepts end-to-end — standalone components, the new control-flow syntax, and a fully data-driven content architecture.

**Live demo:** _add your deployed URL here_
**Author:** [Daniel Henrique Bartholdy](https://linkedin.com/in/daniel-bartholdy)

---

## About the project

This portfolio was originally forked from [felipeAguiarCode/angular-blog](https://github.com/felipeAguiarCode/angular-blog) as the base for a hands-on Angular challenge, then extended and rebuilt with original content, layout and structure.

Rather than hardcoding content into templates, every section of the site — hero, about, experience, projects and contact — is driven by strongly-typed data files, making the whole portfolio easy to update without touching component logic.

## Features

- **Hero** — quick introduction and call to action
- **About** — a short personal summary
- **Experience** — a detailed, timeline-style history of professional roles
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
├── pages/            # Route-level pages (home, project-details)
├── app.routes.ts      # Application routes
└── app.config.ts      # Application-wide configuration
```

Content lives entirely in `src/app/data/`. To update a section — add a new role to Experience, or a new entry to Projects — edit the corresponding data file; no template changes required.

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
npm run build
```

Compiles the project and outputs production-ready artifacts to `dist/`.

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

Based on the base project from the [Alura](https://www.alura.com.br/) Java + Angular immersion, forked from [felipeAguiarCode/angular-blog](https://github.com/felipeAguiarCode/angular-blog).

## Contact

- **LinkedIn:** [linkedin.com/in/daniel-bartholdy](https://linkedin.com/in/daniel-bartholdy)
- **GitHub:** [github.com/dhbart](https://github.com/dhbart)
