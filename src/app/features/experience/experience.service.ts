import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperienceResponse } from './experience.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly api = inject(ApiService);

  getExperiences(): Observable<ExperienceResponse[]> {
    return this.api.get<ExperienceResponse[]>('experiences');
  }
}
