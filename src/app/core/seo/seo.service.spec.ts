import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { describe, expect, it, beforeEach } from 'vitest';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  beforeEach(() => {
    document.head.querySelectorAll('meta, link[rel="canonical"]').forEach(element => element.remove());
  });

  it('updates titles, language, social metadata, and canonical URL', () => {
    const service = TestBed.inject(SeoService);
    service.update({
      title: 'Project', description: 'A project', keywords: 'angular', locale: 'en-US',
      path: '/projects/demo', image: '/assets/project.png', type: 'article',
    });
    const meta = (selector: string) => document.head.querySelector<HTMLMetaElement>(selector)?.content;
    expect(TestBed.inject(Title).getTitle()).toBe('Project');
    expect(document.documentElement.lang).toBe('en-US');
    expect(meta('meta[name="description"]')).toBe('A project');
    expect(meta('meta[property="og:type"]')).toBe('article');
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toContain('/projects/demo');
    expect(meta('meta[property="og:image"]')).toContain('/assets/project.png');

    service.update({ title: 'Home', description: 'Home', keywords: 'portfolio', locale: 'pt-BR' });
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull();
    expect(document.head.querySelector('meta[name="twitter:image"]')).toBeNull();
  });
});

