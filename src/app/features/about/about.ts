import { Component, effect, inject, signal } from '@angular/core';

import { LoadingService } from '../../core/services/loading.service';
import { AboutResponse } from './about.models';
import { AboutService } from './about.service';
import { LocaleService } from '../../core/i18n/locale.service';


@Component({
  selector: 'bp-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly aboutService = inject(AboutService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly about = signal<AboutResponse | null>(null);
  readonly ui = this.localeService.translations;

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      const request = this.loadingService.track(this.aboutService.getAbout()).subscribe({
        next: (about) => this.about.set(about),
        error: (error) => console.error(`Failed to load About data for ${locale}.`, error),
      });

      onCleanup(() => request.unsubscribe());
    });
  }
}
