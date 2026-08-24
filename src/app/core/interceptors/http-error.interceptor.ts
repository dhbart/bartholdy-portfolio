import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

import { injectHttpErrorHandler } from '../services/http-error-handler.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorHandler = injectHttpErrorHandler();

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => errorHandler.handle(error)),
  );
};
