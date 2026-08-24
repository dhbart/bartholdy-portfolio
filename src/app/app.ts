import { Component, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { LocaleService } from './core/i18n/locale.service';
import { SeoService } from './core/seo/seo.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly router = inject(Router);
  private readonly localeService = inject(LocaleService);
  private readonly seoService = inject(SeoService);
  protected readonly title = signal('bartholdy-portfolio');

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.updateRouteSeo());
    effect(() => {
      this.localeService.locale();
      this.updateRouteSeo();
    });
  }

  private updateRouteSeo(): void {
    const ui = this.localeService.translations();
    const routeKey = this.router.routerState.root.firstChild?.snapshot.data['seo'];
    const metadata = routeKey === 'notFound'
      ? { title: ui.seo.notFoundTitle, description: ui.seo.notFoundDescription }
      : { title: ui.seo.homeTitle, description: ui.seo.homeDescription };

    this.seoService.update({
      ...metadata,
      keywords: ui.seo.keywords,
      locale: this.localeService.locale(),
      path: this.router.url,
    });
  }
}
