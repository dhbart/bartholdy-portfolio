
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bp-not-found',
  imports: [RouterLink],
  template: `
    <main class="not-found">
      <div class="container">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <a class="button" routerLink="/">Back to Home</a>
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
export class NotFound {}
