import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectResponse } from './project.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly api = inject(ApiService);

  getProjects(): Observable<ProjectResponse[]> {
    return this.api.get<ProjectResponse[]>('projects');
  }

  getProject(slug: string): Observable<ProjectResponse> {
    return this.api.get<ProjectResponse>(`projects/${encodeURIComponent(slug)}`);
  }
}
