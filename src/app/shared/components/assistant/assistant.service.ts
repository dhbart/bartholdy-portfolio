import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { AssistantChatResponse } from './assistant.models';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  private readonly api = inject(ApiService);

  chat(message: string): Observable<string> {
    const path = 'assistant/chat';
    return this.api.post<AssistantChatResponse | string>(path, { message }).pipe(
      map(response => typeof response === 'string'
        ? response
        : response.response ?? response.message ?? response.content ?? ''),
    );
  }
}
