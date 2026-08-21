import { mkdir, writeFile } from 'node:fs/promises';

const apiUrl = process.env.API_URL?.trim();

if (!apiUrl) {
  throw new Error('API_URL is required to build the production application.');
}

try {
  new URL(apiUrl);
} catch {
  throw new Error('API_URL must be a valid absolute URL.');
}

await mkdir('src/environments', { recursive: true });
await writeFile(
  'src/environments/environment.prod.ts',
  `export const environment = {\n  production: true,\n  apiUrl: ${JSON.stringify(apiUrl)},\n} as const;\n`,
);
