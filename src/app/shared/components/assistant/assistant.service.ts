import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { ApiService } from '../../../core/api/api.service';
import { AssistantChatResponse } from './assistant.models';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  private readonly api = inject(ApiService);

  chat(message: string): Observable<string> {
    const path = 'assistant/chat';
    console.debug('[AssistantService] Sending chat request', {
      path,
      messageLength: message.length,
      messagePreview: message.slice(0, 80),
    });

    return this.api.post<AssistantChatResponse | string>(path, { message }).pipe(
      tap(response => console.debug('[AssistantService] Chat response received', {
        responseType: typeof response,
        response,
      })),
      map(response => typeof response === 'string'
        ? response
        : response.response ?? response.message ?? response.content ?? ''),
      tap(content => console.debug('[AssistantService] Chat content mapped', {
        contentLength: content.length,
      })),
      catchError(error => {
        console.error('[AssistantService] Chat request failed', {
          path,
          errorName: error instanceof Error ? error.name : typeof error,
          errorMessage: error instanceof Error ? error.message : error,
          status: error?.status,
          details: error?.details,
        });
        return throwError(() => error);
      }),
    );
  }
}
