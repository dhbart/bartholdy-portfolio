import { describe, expect, it } from 'vitest';
import { routes } from './app.routes';

describe('application routes', () => {
  it('defines home, detail, lazy, and wildcard routes', () => {
    expect(routes[0].path).toBe('');
    expect(routes[0].data?.['seo']).toBe('home');
    expect(routes.find(route => route.path === 'projects/:id')?.loadComponent).toBeTypeOf('function');
    expect(routes.find(route => route.path === 'certifications/:id')?.loadComponent).toBeTypeOf('function');
    expect(routes.at(-1)?.path).toBe('**');
    expect(routes.at(-1)?.data?.['seo']).toBe('notFound');
  });

  it('loads detail and not-found components from their lazy boundaries', async () => {
    const project = await routes[1].loadComponent!();
    const certification = await routes[2].loadComponent!();
    const notFound = await routes[3].loadComponent!();
    expect(project).toBeTruthy();
    expect(certification).toBeTruthy();
    expect(notFound).toBeTruthy();
  });
});

