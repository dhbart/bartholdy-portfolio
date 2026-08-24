import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from '../../app.routes';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { localeHeaderInterceptor } from '../interceptors/locale-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })),
    provideHttpClient(withInterceptors([
      localeHeaderInterceptor,
      httpErrorInterceptor
    ]))
  ]
};
