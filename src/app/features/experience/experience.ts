import { Component, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ExperienceResponse } from './experience.models';
import { ExperienceService } from './experience.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { RevealOnScrollDirective } from '../../shared/components/reveal-on-scroll.directive';
import { TechnologyBadgeComponent } from '../../shared/components/technology-badge/technology-badge';

@Component({
  selector: 'bp-experience',
  imports: [LoadingState, RevealOnScrollDirective, TechnologyBadgeComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly experienceService = inject(ExperienceService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly experienceResource = resource<ExperienceResponse[], string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.experienceService.getExperiences()),
    defaultValue: [],
  });
  readonly experiences = this.experienceResource.value;
  readonly status = this.experienceResource.status;
  readonly error = this.experienceResource.error;
}
