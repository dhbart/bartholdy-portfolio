import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-not-found',
  imports: [RouterLink],
  template: `
    <main class="not-found">
      <div class="container">
        <h1>{{ ui().notFound.title }}</h1>
        <p>{{ ui().notFound.message }}</p>
        <a class="button" routerLink="/">{{ ui().buttons.home }}</a>
      </div>
    </main>
  `,
  styles: `
    .not-found {
      min-height: 60vh;
      display: grid;
      place-items: center;
      text-align: center;
    }

    .not-found p {
      margin-block: var(--space-4);
    }
  `,
})
export class NotFound {
  readonly ui = inject(LocaleService).translations;
}
