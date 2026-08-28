import { environment } from '../../../../environments/environment';

/**
 * Display names are intentionally mapped to the backend's canonical slugs.
 * The map is the only place that needs updating when a supported icon is added.
 */
const TECHNOLOGY_ICON_SLUGS: Record<string, string> = {
  angular: 'angular',
  azuredevops: 'azure-devops',
  csharp: 'csharp',
  c: 'csharp',
  docker: 'docker',
  gradle: 'gradle',
  java: 'java',
  mongodb: 'mongodb',
  mysql: 'mysql',
  openai: 'openai',
  openapi: 'openapi',
  oracle: 'oracle',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  postresql: 'postgresql',
  redis: 'redis',
  springai: 'spring-ai',
  springboot: 'spring-boot',
  sql: 'sql',
  sqlserver: 'sql-server',
  typescript: 'typescript',
  visualbasic: 'visual-basic',
};

function normalizeTechnologyName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\d+$/, '');
}

export function technologyIconUrl(name: string): string | null {
  const slug = TECHNOLOGY_ICON_SLUGS[normalizeTechnologyName(name)];

  if (!slug) {
    return null;
  }

  // API endpoints live below /api/v1, while Spring serves static assets at /icons.
  const baseUrl = environment.apiUrl
    .replace(/\/api\/v1\/?$/, '')
    .replace(/\/$/, '');
  return `${baseUrl}/icons/technologies/${encodeURIComponent(slug)}.svg`;
}
