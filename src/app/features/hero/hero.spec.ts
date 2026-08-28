import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { Hero } from './hero';
import { LocaleService } from '../../core/i18n/locale.service';
import { localeHeaderInterceptor } from '../../core/interceptors/locale-header.interceptor';
import { httpErrorInterceptor } from '../../core/interceptors/http-error.interceptor';
import { ApiService } from '../../core/api/api.service';
import { HttpErrorHandlerService } from '../../core/services/http-error-handler.service';

describe('Hero resource', () => {
  let fixture: ComponentFixture<Hero>;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        ApiService, LocaleService, HttpErrorHandlerService,
        provideHttpClient(withInterceptors([localeHeaderInterceptor, httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(Hero);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('exposes loading, value, and error states through the rendered UI', async () => {
    expect(fixture.nativeElement.querySelector('bp-loading-state')).not.toBeNull();
    const request = http.expectOne('/api/v1/hero');
    request.flush({
      id: 1, greeting: 'Hello', name: 'Daniel', title: 'Engineer', description: 'Builds things',
      primaryButtonLabel: 'Projects', primaryButtonUrl: '#projects',
      secondaryButtonLabel: 'CV', secondaryButtonUrl: '/cv.pdf',
    });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Daniel');

    const failingFixture = TestBed.createComponent(Hero);
    failingFixture.detectChanges();
    const failed = http.expectOne('/api/v1/hero');
    failed.flush({ status: 500, message: 'Server error' }, { status: 500, statusText: 'Error' });
    await failingFixture.whenStable();
    failingFixture.detectChanges();
    expect(failingFixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('refreshes automatically when the locale signal changes', async () => {
    http.expectOne('/api/v1/hero').flush({
      id: 1, greeting: 'Olá', name: 'Daniel', title: 'Engenheiro', description: 'Constrói',
      primaryButtonLabel: 'Projetos', primaryButtonUrl: '#projects',
      secondaryButtonLabel: 'CV', secondaryButtonUrl: '/cv.pdf',
    });
    await fixture.whenStable();
    TestBed.inject(LocaleService).setLocale('en-US');
    TestBed.flushEffects();
    fixture.detectChanges();
    const refresh = http.expectOne('/api/v1/hero');
    expect(refresh.request.headers.get('Accept-Language')).toBe('en-US');
    refresh.flush({
      id: 1, greeting: 'Hello', name: 'Daniel', title: 'Engineer', description: 'Builds',
      primaryButtonLabel: 'Projects', primaryButtonUrl: '#projects',
      secondaryButtonLabel: 'CV', secondaryButtonUrl: '/cv.pdf',
    });
  });
});
