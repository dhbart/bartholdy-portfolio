# Guia do Projeto — Bartholdy Portfolio

> Documento consolidado da conversa sobre a construção de um portfólio profissional com Angular.

## 1. Visão geral

O projeto nasceu como resposta ao desafio do bootcamp de Spring Boot e Angular da DIO, inspirado no repositório [angular-blog](https://github.com/felipeAguiarCode/angular-blog). A decisão principal foi transformar a ideia de “lista de posts + detalhes” em “lista de projetos + estudos de caso”.

O portfólio deve comunicar a experiência de Daniel Bartholdy como:

- Tech Lead;
- Business Analyst;
- Solution Consultant / Product Manager;
- profissional de ERP, integrações, arquitetura e produtos digitais.

As referências visuais discutidas foram [Braydon Coyer](https://www.braydoncoyer.dev/about), [Ahsan Khan](https://www.ahsankhan.me/) e [Fidalgo](https://fidalgo.dev/). O direcionamento visual é minimalista, profissional, com bastante espaço em branco, tipografia forte, conteúdo como protagonista e animações discretas.

## 2. Estratégia de entrega

### V1 — entregar o desafio

A primeira versão deve ser simples, funcional e próxima da dinâmica do Angular Blog:

```text
Home
 ├── Header
 ├── Hero
 ├── About
 ├── Featured Project
 ├── Projects Grid
 ├── Experience
 ├── Contact
 └── Footer

Projeto selecionado
 └── /projects/:id
```

Na V1, os dados são mockados em arquivos TypeScript dentro de `data/`. Não entram ainda backend, autenticação, CMS, filtros avançados ou internacionalização completa.

### V2 — evoluir depois da entrega

Tudo que aumenta o escopo deve ser registrado no backlog, sem desviar o foco da primeira entrega.

## 3. Stack e decisões técnicas

- Angular 22.1.x;
- Angular CLI 22.1.x;
- Node.js 22.23.x;
- TypeScript 6;
- Standalone Components;
- SCSS;
- Router;
- novo control flow: `@if` e `@for`;
- `strictTemplates` habilitado;
- componentes com prefixo `bp-`;
- CSS Variables para tokens e temas;
- sem Bootstrap, Material ou PrimeNG na V1;
- SSR inicialmente desativado;
- abordagem desktop-first, seguida de ajustes responsivos.

## 4. Arquitetura definida

### Separação por responsabilidade

```text
app/
├── components/       Componentes de apresentação da V1
├── pages/            Telas e páginas roteáveis
├── data/             Conteúdo estático/mockado
├── core/             Serviços globais futuros
├── shared/           Componentes reutilizáveis futuros
├── app.ts            Composição da aplicação
├── app.html          Layout principal
├── app.routes.ts     Rotas
└── app.config.ts     Configuração do Angular
```

Foi discutida uma estrutura futura mais granular (`layout`, `pages`, `shared`, `core`, `models` e `services`). Para a V1, a estrutura mais simples com `components`, `pages` e `data` foi mantida para facilitar o aprendizado e a entrega.

### Regra de fluxo de dados

```text
data/*.ts
    ↓
componente.ts
    ↓
template.html
```

Os templates apresentam os dados; os componentes fazem a ponte entre os dados e o HTML; a pasta `data` concentra o conteúdo. A propriedade do componente normalmente é somente leitura:

```typescript
import { hero as heroData } from '../../data/hero';

export class Hero {
  readonly hero = heroData;
}
```

O alias `as heroData` evita a confusão de nomes em construções como `hero = hero`.

### Layout principal

O `app.html` deve permanecer pequeno:

```html
<bp-header />

<router-outlet />

<bp-footer />
```

O `Home` funciona como orquestrador:

```html
<bp-hero />
<bp-about />
<bp-featured-project />
<bp-projects-grid />
<bp-experience />
<bp-contact />
```

Cada componente tem uma responsabilidade única e o conteúdo não fica espalhado em um template gigante.

## 5. Estrutura de componentes

### Componentes implementados ou previstos para a V1

```text
components/
├── header/
├── footer/
├── hero/
├── about/
├── featured-project/
├── projects-grid/
├── experience/
└── contact/

pages/
├── home/
└── project-details/
```

### Hierarquia

```text
App
├── Header
├── RouterOutlet
│   ├── Home
│   │   ├── Hero
│   │   ├── About
│   │   ├── FeaturedProject
│   │   ├── ProjectsGrid
│   │   ├── Experience
│   │   └── Contact
│   └── ProjectDetails
└── Footer
```

### Componentes reutilizáveis planejados para V2

```text
shared/
├── button/
├── badge/
├── project-card/
├── section-title/
├── timeline/
├── timeline-item/
├── social-links/
├── skill-card/
├── blog-card/
├── certification-card/
├── theme-toggle/
└── scroll-to-top/
```

O `ButtonComponent` foi discutido como uma boa evolução, mas a decisão final foi não aumentar o escopo da V1 antes da entrega.

## 6. Design System

### Direção visual

- estética inspirada em Ahsan Khan, Vercel, Linear e GitHub;
- fundo claro e escuro com alto contraste;
- azul como cor de ação;
- tipografia Inter;
- espaçamentos consistentes em múltiplos de 4 e 8;
- cards discretos, bordas suaves e sombras leves;
- sem excesso de gradientes, efeitos ou animações.

### Tokens semânticos

Os componentes não devem conhecer cores concretas. Devem usar significado:

```scss
color: var(--text-primary);
background: var(--background);
border: 1px solid var(--border);
```

Evitar nomes visuais como `--blue`, `--white` ou `--gray`. Preferir `--primary`, `--background`, `--border` e `--text-primary`.

### Paleta proposta

#### Light

```scss
:root {
  --background: #ffffff;
  --surface: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border: #e2e8f0;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
}
```

#### Dark

```scss
[data-theme='dark'] {
  --background: #0f172a;
  --surface: #111827;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --border: #334155;
  --primary: #3b82f6;
  --primary-hover: #60a5fa;
}
```

### Estrutura SCSS

```text
src/styles/
├── abstracts/
│   └── _variables.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _globals.scss
├── themes/
│   ├── _light.scss
│   └── _dark.scss
└── styles.scss
```

Os arquivos iniciados por `_` são partials SCSS: módulos reutilizáveis que não representam uma folha de estilo independente. O `styles.scss` é o ponto de entrada.

Ordem sugerida:

```scss
@use './styles/base/reset';
@use './styles/abstracts/variables';
@use './styles/themes/light';
@use './styles/base/globals';
```

### Container global

```scss
.container {
  width: min(1120px, calc(100% - 2rem));
  margin-inline: auto;
}
```

Isso mantém o conteúdo centralizado e limita a largura sem depender de várias media queries.

## 7. Convenções de código

### BEM

Todos os componentes devem usar nomes com escopo claro:

```text
hero
hero__content
hero__title
hero__actions
hero__button
hero__button--primary
```

Exemplos:

```text
header__navbar
header__logo
header__menu
header__menu-item
header__menu-link
header__theme-toggle

projects__grid
projects__card
projects__card-image
projects__tag
```

### Angular moderno

- usar componentes standalone;
- importar explicitamente as diretivas utilizadas, como `RouterLink` e `RouterOutlet`;
- preferir `@for` a `*ngFor`;
- usar `track` nas listas;
- usar `@if` para renderização condicional;
- manter textos e conteúdo nos arquivos de `data`;
- usar `readonly` quando o componente não altera os dados;
- não ultrapassar aproximadamente 150 linhas sem reavaliar a divisão do componente.

### Dados

Arquivos importados devem usar o sufixo `Data` no alias:

```typescript
import { navigation as navigationData } from '../../data/navigation';

export class Header {
  readonly navigation = navigationData;
}
```

## 8. Dados da aplicação

### `data/navigation.ts`

```typescript
export const navigation = [
  { label: 'About', route: '#about' },
  { label: 'Projects', route: '#projects' },
  { label: 'Experience', route: '#experience' },
  { label: 'Contact', route: '#contact' }
];
```

No template:

```html
<ul class="header__menu">
  @for (item of navigation; track item.route) {
    <li class="header__menu-item">
      <a class="header__menu-link" [href]="item.route">
        {{ item.label }}
      </a>
    </li>
  }
</ul>
```

### `data/hero.ts`

```typescript
export const hero = {
  greeting: "Hi, I'm",
  name: 'Daniel Bartholdy',
  title: 'Tech Lead • Business Analyst • Product Manager',
  description:
    'I build technology solutions that solve real business problems, lead high-performing teams and create scalable software.',
  actions: {
    primary: {
      label: 'View Projects',
      href: '#projects'
    },
    secondary: {
      label: 'Download Resume',
      href: '#'
    }
  }
};
```

Foi padronizado o uso de `href` para links de âncora. Se o objeto usar `link`, o template deve usar `link`; os nomes precisam ser consistentes.

### `data/about.ts`

```typescript
export const about = {
  title: 'About Me',
  description: [
    'I have over 10 years of experience designing and delivering technology solutions for enterprise environments.',
    'Throughout my career I have worked with ERP systems, systems integration, software architecture, technical leadership and product-oriented teams.',
    'Today I enjoy connecting business needs with technology, helping teams deliver solutions that generate real value.'
  ]
};
```

### `data/projects.ts`

O modelo foi enriquecido para atender tanto a Home quanto a tela de detalhes:

```typescript
export const projects = [
  {
    id: 'portfolio',
    featured: true,
    title: 'Bartholdy Portfolio',
    headline: 'A modern portfolio built with Angular 22.',
    description: 'Personal portfolio developed with Angular, TypeScript and SCSS.',
    challenge: 'Create a professional portfolio while applying modern Angular concepts.',
    solution: 'Use standalone components, modern control flow, reusable styles and data-driven presentation.',
    technologies: ['Angular', 'TypeScript', 'SCSS'],
    github: '#',
    demo: '#',
    image: '/images/projects/portfolio.png'
  },
  {
    id: 'movie-api',
    featured: false,
    title: 'Movie API',
    headline: 'A REST API for browsing and searching movies.',
    description: 'REST API developed with Spring Boot following clean architecture principles.',
    challenge: 'Create a scalable API capable of searching movies efficiently.',
    solution: 'Implement layered architecture, REST endpoints, Swagger documentation and persistence.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    github: '#',
    demo: '#',
    image: '/images/projects/movie-api.png'
  }
];
```

O campo `featured` permite separar o projeto principal dos cards da grade:

```typescript
readonly projects = projectsData.filter(project => !project.featured);
```

## 9. Roteamento

### Rotas da V1

```typescript
export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'projects/:id',
    component: ProjectDetails
  }
];
```

O formato escolhido é:

```text
/projects/movie-api
```

### Navegação da grade

```html
<a [routerLink]="['/projects', project.id]">
  View Details →
</a>
```

É preferível usar `routerLink` para navegação interna, em vez de montar URLs manualmente.

### Página de detalhes

```typescript
import { ActivatedRoute } from '@angular/router';
import { getProjectById } from '../../data/projects';

export class ProjectDetails {
  project = getProjectById('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.project = getProjectById(id);
    }
  }
}
```

Busca centralizada no arquivo de dados:

```typescript
export function getProjectById(id: string) {
  return projects.find(project => project.id === id);
}
```

Se o TypeScript reclamar de `this.project`, a propriedade precisa ser declarada dentro da classe antes de ser usada. Essa foi uma das dúvidas práticas levantadas durante a implementação.

Template inicial:

```html
<section class="project-details">
  <div class="container">
    @if (project) {
      <h1>{{ project.title }}</h1>
      <img [src]="project.image" [alt]="project.title" />
      <p>{{ project.description }}</p>
    }
  </div>
</section>
```

## 10. Sprints e evolução

> A conversa refinou alguns números de sprint durante o desenvolvimento. A sequência abaixo organiza os resultados por ordem de execução.

### Sprint 0 — direção do produto

- analisar o desafio da DIO;
- escolher o portfólio como projeto final;
- analisar referências visuais;
- definir o nome `bartholdy-portfolio`;
- separar V1 e V2.

### Sprint 1 — estrutura e rota inicial

- confirmar Angular 22, Node 22 e SCSS;
- criar a estrutura de pastas;
- criar `Home`, `Header` e `Footer`;
- configurar `app.routes.ts`;
- manter `app.html` com `router-outlet`;
- adotar prefixo `bp-`;
- validar `ng serve`.

### Sprint 2 — layout da aplicação

- colocar `<bp-header />` e `<bp-footer />` no layout principal;
- importar `RouterOutlet` e `RouterLink` conforme necessário;
- validar o fluxo Header → Home → Footer;
- manter Dark Mode como placeholder.

### Sprint 3 — composição da Home

- criar `Hero`, `About`, `FeaturedProject` e `Contact`;
- deixar o `Home` como orquestrador;
- evitar um template monolítico;
- introduzir responsabilidade única.

### Sprint 4 — Design System e SCSS global

- criar partials SCSS;
- definir tokens semânticos;
- criar temas Light e Dark;
- adotar Inter;
- criar reset, globais e `.container`.

### Sprint 5 — dados fora dos componentes

- criar `data/navigation.ts`, `data/hero.ts`, `data/about.ts` e `data/projects.ts`;
- expor os dados no TypeScript de cada componente;
- evitar textos mágicos nos templates;
- adotar aliases `*Data`.

### Sprint 6 — Header

- Header sticky com altura de 72px;
- logo à esquerda;
- menu criado com `@for`;
- botão de tema como placeholder;
- hover nos links;
- underline com pseudo-elemento;
- corrigir a classe `header__menu-link` no `<a>`;
- adicionar `position: relative` e `display: inline-block`.

### Sprint 7 — Hero

- criar saudação, nome, cargo, descrição e ações;
- usar layout orientado a dados;
- aplicar BEM;
- usar `clamp()` na tipografia;
- usar Grid para reservar uma área visual futura;
- definir `View Projects` como ação primária;
- limitar a largura da descrição.

### Sprint 8 — About e Featured Project

- renderizar parágrafos com `@for`;
- exibir o projeto marcado como `featured`;
- aplicar `@if` para conteúdo opcional;
- manter a regra de seleção separada dos componentes sempre que possível.

### Sprint 9 — Projects Grid

- filtrar projetos não destacados;
- renderizar cards com `@for` aninhado para tecnologias;
- usar `track project.id` e `track technology`;
- aplicar Grid responsivo com `auto-fit` e `minmax`;
- usar `aspect-ratio: 16 / 9` nas imagens;
- criar tags/chips de tecnologias;
- incluir GitHub e View Details.

### Sprint 10 — refinamento do Header e Hero

- revisar espaçamento e hierarquia visual;
- diminuir o vazio do Hero;
- limitar descrição a aproximadamente 560–620px;
- reforçar o contraste do botão secundário;
- organizar ações do Header com Flexbox;
- remover ou manter a área visual do Hero conforme o layout final.

### Sprint 11 — Featured Project como destaque

- transformar o destaque em uma seção visualmente diferente;
- usar Grid de duas colunas;
- imagem à esquerda e conteúdo à direita;
- reduzir a imagem para cerca de 45% da largura em telas grandes;
- separar claramente Featured Project de Selected Projects.

### Sprint 12 — Projects Grid consolidada

- finalizar a estrutura dos cards;
- padronizar imagem, título, descrição, tags e ações;
- preparar a lista para receber links de detalhes.

### Sprint 13 — Project Details

- criar `pages/project-details`;
- adicionar a rota `projects/:id`;
- capturar `id` com `ActivatedRoute`;
- localizar o projeto em `projects.ts`;
- usar `routerLink` na grade;
- exibir título, imagem, descrição, tecnologias, arquitetura, GitHub e Demo;
- corrigir a declaração da propriedade `project` dentro da classe.

## 11. Checklist de conclusão da V1

### Fundação

- [x] Projeto Angular criado e executando.
- [x] Angular moderno e Standalone Components adotados.
- [x] SCSS configurado.
- [x] `strictTemplates` verificado.
- [x] Prefixo `bp-` adotado.
- [x] Router configurado.
- [x] Header e Footer criados.

### Arquitetura

- [x] `Home` funciona como orquestrador.
- [x] Componentes separados por responsabilidade.
- [x] Dados concentrados em `data/`.
- [x] Convenção de alias `*Data` definida.
- [x] BEM adotado.
- [x] `.container` global definido.

### Interface

- [x] Header com navegação dinâmica.
- [x] Hero com conteúdo dinâmico.
- [x] About com parágrafos dinâmicos.
- [x] Featured Project.
- [x] Projects Grid.
- [x] Tags de tecnologia.
- [x] Links de GitHub/Demo preparados.
- [x] Layout Light/Dark preparado por tokens.
- [ ] Revisar responsividade em mobile.
- [ ] Revisar acessibilidade, foco e textos alternativos.

### Navegação

- [x] Rota inicial `/`.
- [x] Rota dinâmica `/projects/:id`.
- [x] Links internos com `routerLink`.
- [ ] Adicionar página 404.
- [ ] Adicionar estado para projeto não encontrado.

## 12. Backlog da V2

### Arquitetura e dados

- [ ] Criar `Project` e demais interfaces/modelos.
- [ ] Extrair `ProjectService`.
- [ ] Substituir mock por API Spring Boot.
- [ ] Criar endpoints para projetos, experiências e artigos.
- [ ] Adicionar PostgreSQL e persistência.
- [ ] Criar área administrativa para cadastrar, editar e remover conteúdo.

### UX e componentes

- [ ] `ButtonComponent` reutilizável.
- [ ] `ThemeService` com Signals e LocalStorage.
- [ ] Toggle Light/Dark funcional.
- [ ] `LanguageService`.
- [ ] Internacionalização pt/en com arquivos de tradução.
- [ ] Filtro por tecnologia.
- [ ] Busca de projetos.
- [ ] Scroll spy.
- [ ] Botão “Back to Top”.
- [ ] Animações de entrada discretas.
- [ ] Ícones Lucide.

### Conteúdo

- [ ] Timeline completa da carreira.
- [ ] Certificações.
- [ ] Artigos.
- [ ] Case Studies com Problema → Análise → Arquitetura → Solução → Resultado.
- [ ] Skills e tecnologias com ícones.
- [ ] Depoimentos ou recomendações.
- [ ] Estatísticas do GitHub.

### Produto e publicação

- [ ] Formulário de contato integrado.
- [ ] Testes unitários e de componentes.
- [ ] SEO e metadados.
- [ ] Deploy do Angular.
- [ ] Deploy da API Spring Boot.
- [ ] Domínio próprio.

## 13. Próximos passos recomendados

1. Finalizar a implementação da rota de detalhes e tratar `project` inexistente.
2. Testar todos os links da grade: `movie-api`, `portfolio` e demais projetos.
3. Revisar o visual completo da Home, ajustando espaçamentos somente depois de todas as seções estarem presentes.
4. Validar desktop, tablet e mobile.
5. Fazer uma revisão de acessibilidade e semântica.
6. Criar um commit pequeno e descritivo:

```bash
git add .
git commit -m "feat: add project details page"
```

7. Só depois da entrega da V1 começar os itens do backlog da V2.

## 14. Princípio final do projeto

O portfólio deve ser mais do que uma cópia do Angular Blog. A referência fornece a dinâmica de lista e detalhes; o projeto final deve demonstrar a capacidade de adaptar essa ideia para um produto próprio, com arquitetura clara, dados organizados, navegação real, design system e conteúdo que evidencie experiência em tecnologia, negócio e liderança.
