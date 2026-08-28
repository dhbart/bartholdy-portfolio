import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { ApiService } from './api.service';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { localeHeaderInterceptor } from '../interceptors/locale-header.interceptor';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { LocaleService } from '../i18n/locale.service';

describe('ApiService and HTTP interceptors', () => {
  let api: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        LocaleService,
        HttpErrorHandlerService,
        provideHttpClient(withInterceptors([localeHeaderInterceptor, httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    api = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('normalizes the API URL and sends the active locale', () => {
    TestBed.inject(LocaleService).setLocale('es-ES');
    api.get<{ ok: boolean }>('/health').subscribe(result => expect(result.ok).toBe(true));
    const request = http.expectOne('/api/v1/health');
    expect(request.request.headers.get('Accept-Language')).toBe('es-ES');
    expect(request.request.headers.get('Cache-Control')).toBe('no-cache');
    request.flush({ ok: true });
  });

  it('supports POST, PUT, and DELETE through the same API boundary', () => {
    api.post('/items', { name: 'a' }).subscribe();
    const post = http.expectOne('/api/v1/items');
    expect(post.request.method).toBe('POST');
    expect(post.request.body).toEqual({ name: 'a' });
    post.flush({});

    api.put('/items/1', { name: 'b' }).subscribe();
    const put = http.expectOne('/api/v1/items/1');
    expect(put.request.method).toBe('PUT');
    put.flush({});

    api.delete('/items/1').subscribe();
    const del = http.expectOne('/api/v1/items/1');
    expect(del.request.method).toBe('DELETE');
    del.flush({});
  });

  it('maps HTTP errors through the error interceptor', () => {
    let error: unknown;
    api.get('/missing').subscribe({ error: value => error = value });
    http.expectOne('/api/v1/missing').flush(
      { status: 404, message: 'Not found', path: '/missing' },
      { status: 404, statusText: 'Not Found' },
    );
    expect(error).toMatchObject({ name: 'ApiHttpError', status: 404, message: 'Not found' });
  });
});
