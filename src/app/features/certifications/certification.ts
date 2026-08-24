import { Component, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './certification.html',
  styleUrl: './certification.scss',
})
export class Certification {
  private readonly certificationService = inject(CertificationService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly certificationsResource = resource<CertificationResponse[], string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.certificationService.getCertifications()),
    defaultValue: [],
  });
  readonly certifications = this.certificationsResource.value;
  readonly status = this.certificationsResource.status;
  readonly error = this.certificationsResource.error;

  typeEmoji(certificationType: string): string {
    return CERTIFICATION_TYPE_EMOJIS[certificationType.toUpperCase()] ?? '📜';
  }
}
