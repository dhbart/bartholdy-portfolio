import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CertificationResponse } from './certification.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  private readonly api = inject(ApiService);

  getCertifications(): Observable<CertificationResponse[]> {
    return this.api.get<CertificationResponse[]>('certifications');
  }
}
