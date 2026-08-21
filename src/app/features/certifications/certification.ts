import { Component, computed, effect, inject, signal } from '@angular/core';

import { LoadingService } from '../../core/services/loading.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { CertificationResponse } from './certification.models';
import { CertificationService } from './certification.service';

const CERTIFICATION_TYPE_EMOJIS: Record<string, string> = {
  DEGREE: '🎓',
  MBA: '🎓',
  CERTIFICATION: '🏅',
  BOOTCAMP: '🚀',
  COURSE: '📚',
  WORKSHOP: '🛠',
};

@Component({
  selector: 'bp-certification',
  imports: [],
  templateUrl: './certification.html',
  styleUrl: './certification.scss',
})
export class Certification {
  private readonly certificationService = inject(CertificationService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly certifications = signal<CertificationResponse[]>([]);
  readonly status = signal<'loading' | 'loaded' | 'error'>('loading');

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      this.status.set('loading');

      const request = this.loadingService
        .track(this.certificationService.getCertifications())
        .subscribe({
          next: (certifications) => {
            this.certifications.set(certifications);
            this.status.set('loaded');
          },
          error: (error) => {
            this.status.set('error');
            console.error(`Failed to load Certification data for ${locale}.`, error);
          },
        });

      onCleanup(() => request.unsubscribe());
    });
  }

  typeEmoji(certificationType: string): string {
    return CERTIFICATION_TYPE_EMOJIS[certificationType.toUpperCase()] ?? '📜';
  }
}
