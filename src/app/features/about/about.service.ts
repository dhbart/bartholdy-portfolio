import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AboutResponse } from './about.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private readonly api = inject(ApiService);

  getAbout(): Observable<AboutResponse> {
    return this.api.get<AboutResponse>('about');
  }
}
