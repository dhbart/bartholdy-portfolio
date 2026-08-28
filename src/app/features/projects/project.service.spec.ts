import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ApiService } from '../../core/api/api.service';
import { localeHeaderInterceptor } from '../../core/interceptors/locale-header.interceptor';
import { LocaleService } from '../../core/i18n/locale.service';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        LocaleService,
        ProjectService,
        provideHttpClient(withInterceptors([localeHeaderInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProjectService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('shares the collection request for the active locale', () => {
    service.getProjects().subscribe();
    service.getProjects().subscribe();

    const request = http.expectOne('/api/v1/projects');
    expect(request.request.headers.get('Accept-Language')).toBe('pt-BR');
    request.flush([]);
  });
});
