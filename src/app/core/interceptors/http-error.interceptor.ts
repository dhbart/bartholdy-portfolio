import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

import { injectHttpErrorHandler } from '../services/http-error-handler.service';
import { LocaleService } from '../i18n/locale.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorHandler = injectHttpErrorHandler();
  const localeService = inject(LocaleService);
  const localizedRequest = request.clone({
    setHeaders: {
      'Accept-Language': localeService.locale(),
      'Cache-Control': 'no-cache',
    },
  });

  return next(localizedRequest).pipe(
    catchError((error: HttpErrorResponse) => errorHandler.handle(error)),
  );
};
