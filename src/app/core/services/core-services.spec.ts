import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, of, throwError } from 'rxjs';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';

import { HttpErrorHandlerService, ApiHttpError } from './http-error-handler.service';
import { LoadingService } from './loading.service';
import { LocaleService } from '../i18n/locale.service';
import { ThemeService } from './theme.service';

describe('core services', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: () => ({ matches: false }),
      });
    }
  });

  afterEach(() => vi.restoreAllMocks());

  it('persists supported locales and updates translated signals', () => {
    const service = TestBed.inject(LocaleService);
    expect(service.locale()).toBe('pt-BR');

    service.setLocale('en-US');

    expect(service.locale()).toBe('en-US');
    expect(service.translations().seo.homeTitle).toBeTruthy();
    expect(localStorage.getItem('locale')).toBe('en-US');
    service.setLocale('xx' as never);
    expect(service.locale()).toBe('en-US');
  });

  it('restores a persisted theme and toggles the document state', () => {
    localStorage.setItem('theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    service.toggle();
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('initializes theme from the system preference when no preference is saved', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({ matches: true }),
    });
    const service = TestBed.inject(ThemeService);
    expect(service.isDark()).toBe(true);
  });

  it('tracks concurrent requests and never goes below zero', async () => {
    const service = TestBed.inject(LoadingService);
    service.start();
    service.start();
    expect(service.isLoading()).toBe(true);
    service.stop();
    service.stop();
    service.stop();
    expect(service.isLoading()).toBe(false);

    await firstValueFrom(service.track(of('ok')));
    expect(service.isLoading()).toBe(false);
  });

  it('maps structured and unreachable HTTP errors', async () => {
    const service = TestBed.inject(HttpErrorHandlerService);
    const structured = new HttpErrorResponse({
      status: 422,
      url: '/projects/demo',
      error: { status: 422, message: 'Invalid project', path: '/projects/demo' },
    });
    await expect(firstValueFrom(service.handle(structured))).rejects.toMatchObject({
      name: 'ApiHttpError', message: 'Invalid project', status: 422, path: '/projects/demo',
    } satisfies Partial<ApiHttpError>);

    const unavailable = new HttpErrorResponse({ status: 0, error: 'offline' });
    await expect(firstValueFrom(service.handle(unavailable))).rejects.toThrow('The API could not be reached.');
  });
});
