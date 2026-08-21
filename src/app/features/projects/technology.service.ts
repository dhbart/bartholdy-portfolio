import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TechnologyResponse } from './technology.models';
import { ApiService } from '../../core/api/api.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private readonly api = inject(ApiService);

  getTechnologies(): Observable<TechnologyResponse[]> {
    return this.api.get<TechnologyResponse[]>('technologies');
  }

  getIconUrl(slug: string): string {
    const baseUrl = environment.apiUrl.replace(/\/$/, '');
    return `${baseUrl}/icons/technologies/${encodeURIComponent(slug)}.svg`;
  }
}
