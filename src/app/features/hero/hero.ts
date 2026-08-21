import { Component, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { LoadingService } from '../../core/services/loading.service';
import { HeroResponse } from './hero.models';
import { HeroService } from './hero.service';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly heroService = inject(HeroService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly hero = signal<HeroResponse | null>(null);

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      const request = this.loadingService.track(this.heroService.getHero()).subscribe({
        next: (hero) => this.hero.set(hero),
        error: (error) => console.error(`Failed to load Hero data for ${locale}.`, error),
      });

      onCleanup(() => request.unsubscribe());
    });
  }
}
