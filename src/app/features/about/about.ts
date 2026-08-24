import { Component, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AboutResponse } from './about.models';
import { AboutService } from './about.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { RevealOnScrollDirective } from '../../shared/components/reveal-on-scroll.directive';


@Component({
  selector: 'bp-about',
  imports: [LoadingState, RevealOnScrollDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly aboutService = inject(AboutService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly aboutResource = resource<AboutResponse, string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.aboutService.getAbout()),
  });
  readonly about = this.aboutResource.value;
  readonly status = this.aboutResource.status;
  readonly error = this.aboutResource.error;
}
