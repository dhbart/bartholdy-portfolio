import { Component, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

import { HeroResponse } from './hero.models';
import { HeroService } from './hero.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';

@Component({
  selector: 'bp-hero',
  imports: [NgOptimizedImage, LoadingState],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly heroService = inject(HeroService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly heroResource = resource<HeroResponse, string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.heroService.getHero()),
  });
  readonly hero = this.heroResource.value;
  readonly status = this.heroResource.status;
  readonly error = this.heroResource.error;
}
