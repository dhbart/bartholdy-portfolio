import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocaleService } from '../i18n/locale.service';

export const localeHeaderInterceptor: HttpInterceptorFn = (request, next) => {
  const localeService = inject(LocaleService);
  const localizedRequest = request.clone({
    setHeaders: {
      'Accept-Language': localeService.locale(),
      'Cache-Control': 'no-cache',
    },
  });

  return next(localizedRequest);
};
