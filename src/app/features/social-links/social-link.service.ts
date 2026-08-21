import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocialLinkResponse } from './social-link.models';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  private readonly api = inject(ApiService);

  getSocialLinks(): Observable<SocialLinkResponse[]> {
    return this.api.get<SocialLinkResponse[]>('social-links');
  }
}
