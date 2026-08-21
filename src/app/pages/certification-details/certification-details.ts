import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingService } from '../../core/services/loading.service';
import { CertificationResponse } from '../../features/certifications/certification.models';
import { CertificationService } from '../../features/certifications/certification.service';
import { BackButton } from '../../shared/components/detail/back-button/back-button';
import { DetailHeader } from '../../shared/components/detail/detail-header/detail-header';
import { DetailMetadata, ExternalLink, TechnologyBadge } from '../../shared/components/detail/detail.models';
import { EmptyState } from '../../shared/components/detail/empty-state/empty-state';
import { ExternalLinks } from '../../shared/components/detail/external-links/external-links';
import { ImagePreview } from '../../shared/components/detail/image-preview/image-preview';
import { InfoCard } from '../../shared/components/detail/info-card/info-card';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { MetadataGrid } from '../../shared/components/detail/metadata-grid/metadata-grid';
import { SectionTitle } from '../../shared/components/detail/section-title/section-title';
import { TechnologyBadges } from '../../shared/components/detail/technology-badges/technology-badges';

@Component({
  selector: 'bp-certification-details',
  imports: [BackButton, DetailHeader, EmptyState, ExternalLinks, ImagePreview, InfoCard, LoadingState, MetadataGrid, SectionTitle, TechnologyBadges],
  templateUrl: './certification-details.html',
  styleUrl: './certification-details.scss',
})
export class CertificationDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly certificationService = inject(CertificationService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly certification = signal<CertificationResponse | undefined>(undefined);
  readonly status = signal<'loading' | 'loaded' | 'error'>('loading');
  readonly ui = this.localeService.translations;

  readonly metadata = computed<readonly DetailMetadata[]>(() => {
    const certification = this.certification();
    if (!certification) return [];

    const labels = this.ui().certificationDetails.metadata;
    return [
      [labels.issueDate, certification.issueDate],
      [labels.expirationDate, certification.expirationDate],
      [labels.credentialId, certification.credentialCode],
      [labels.workload, certification.workload],
      [labels.institution, certification.institution ?? certification.issuer],
      [labels.type, certification.certificationType],
      [labels.status, certification.status],
    ].filter((item): item is [string, string] => Boolean(item[1]))
      .map(([label, value]) => ({ label, value }));
  });

  readonly technologies = computed<readonly TechnologyBadge[]>(() => {
    const technologies = this.certification()?.technologies ?? [];
    return technologies.map((technology, index) =>
      typeof technology === 'string'
        ? { id: `${technology}-${index}`, name: technology }
        : { id: technology.id, name: technology.name },
    );
  });

  readonly externalLinks = computed<readonly ExternalLink[]>(() => {
    const certification = this.certification();
    if (!certification) return [];
    const labels = this.ui().certificationDetails;
    return [
      { label: labels.credential, url: certification.credentialUrl ?? '', type: 'credential' },
      { label: labels.institution, url: certification.institutionUrl ?? '', type: 'website' },
      { label: labels.repository, url: certification.repositoryUrl ?? '', type: 'github' },
    ];
  });

  constructor() {
    effect((onCleanup) => {
      const id = this.route.snapshot.paramMap.get('id');
      const locale = this.localeService.locale();
      if (!id) {
        this.status.set('error');
        return;
      }

      this.certification.set(undefined);
      this.status.set('loading');
      const request = this.loadingService.track(this.certificationService.getCertification(id)).subscribe({
        next: (certification) => {
          this.certification.set(certification);
          this.status.set('loaded');
        },
        error: (error) => {
          this.status.set('error');
          console.error(`Failed to load certification ${id} for ${locale}.`, error);
        },
      });
      onCleanup(() => request.unsubscribe());
    });
  }
}
