import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LocaleCode } from '../i18n/locale.types';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: 'website' | 'article';
  locale: LocaleCode;
  robots?: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  update(metadata: SeoMetadata): void {
    const url = this.absoluteUrl(metadata.path ?? this.document.location?.pathname ?? '/');
    const image = metadata.image ? this.absoluteUrl(metadata.image) : undefined;

    this.title.setTitle(metadata.title);
    this.document.documentElement.lang = metadata.locale;
    this.setMeta('description', metadata.description);
    this.setMeta('keywords', metadata.keywords);
    this.setMeta('robots', metadata.robots ?? 'index, follow');
    this.setMeta('og:title', metadata.title, 'property');
    this.setMeta('og:description', metadata.description, 'property');
    this.setMeta('og:url', url, 'property');
    this.setMeta('og:type', metadata.type ?? 'website', 'property');
    this.setMeta('og:locale', metadata.locale, 'property');
    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', metadata.title);
    this.setMeta('twitter:description', metadata.description);

    if (image) {
      this.setMeta('og:image', image, 'property');
      this.setMeta('twitter:image', image);
    } else {
      this.removeMeta('og:image', 'property');
      this.removeMeta('twitter:image');
    }

    this.setCanonical(url);
  }

  private setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    this.meta.updateTag({ [attribute]: name, content });
  }

  private removeMeta(name: string, attribute: 'name' | 'property' = 'name'): void {
    this.meta.removeTag(`${attribute}="${name}"`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private absoluteUrl(path: string): string {
    return new URL(path, this.document.baseURI).href;
  }
}
