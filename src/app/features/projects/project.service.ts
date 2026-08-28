import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ProjectResponse } from './project.models';
import { ApiService } from '../../core/api/api.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LocaleCode } from '../../core/i18n/locale.types';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly api = inject(ApiService);
  private readonly localeService = inject(LocaleService);
  private readonly projectRequests = new Map<LocaleCode, Observable<ProjectResponse[]>>();

  getProjects(): Observable<ProjectResponse[]> {
    const locale = this.localeService.locale();
    const cachedRequest = this.projectRequests.get(locale);
    if (cachedRequest) return cachedRequest;

    const request = this.api.get<ProjectResponse[]>('projects').pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.projectRequests.set(locale, request);
    return request;
  }

  getProject(slug: string): Observable<ProjectResponse> {
    return this.api.get<ProjectResponse>(`projects/${encodeURIComponent(slug)}`);
  }
}
