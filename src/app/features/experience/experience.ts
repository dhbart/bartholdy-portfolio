import { Component, effect, inject, signal } from '@angular/core';

import { LoadingService } from '../../core/services/loading.service';
import { ExperienceResponse } from './experience.models';
import { ExperienceService } from './experience.service';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly experienceService = inject(ExperienceService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly experiences = signal<ExperienceResponse[]>([]);

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      const request = this.loadingService
        .track(this.experienceService.getExperiences())
        .subscribe({
          next: (experiences) => this.experiences.set(experiences),
          error: (error) => console.error(`Failed to load Experience data for ${locale}.`, error),
        });

      onCleanup(() => request.unsubscribe());
    });
  }
}
