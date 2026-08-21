import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiErrorResponse } from '../models/common.models';

export class ApiHttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string,
    readonly details: ApiErrorResponse | null,
  ) {
    super(message);
    this.name = 'ApiHttpError';
  }
}

@Injectable({ providedIn: 'root' })
export class HttpErrorHandlerService {
  handle(error: HttpErrorResponse): Observable<never> {
    const details = this.getApiError(error);
    const message = details?.message || this.getFallbackMessage(error);

    return throwError(
      () => new ApiHttpError(message, error.status, details?.path ?? '', details),
    );
  }

  private getApiError(error: HttpErrorResponse): ApiErrorResponse | null {
    if (!error.error || typeof error.error !== 'object') {
      return null;
    }

    const body = error.error as Partial<ApiErrorResponse>;
    if (typeof body.message !== 'string' || typeof body.status !== 'number') {
      return null;
    }

    return body as ApiErrorResponse;
  }

  private getFallbackMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'The API could not be reached.';
    }

    return error.message || 'The API request failed.';
  }
}

export function injectHttpErrorHandler(): HttpErrorHandlerService {
  return inject(HttpErrorHandlerService);
}
