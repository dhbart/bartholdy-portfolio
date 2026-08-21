import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HeroResponse } from './hero.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly api = inject(ApiService);

  getHero(): Observable<HeroResponse> {
    return this.api.get<HeroResponse>('hero');
  }
}
