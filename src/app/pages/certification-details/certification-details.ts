import { Component, computed, inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

import { LocaleService } from '../../core/i18n/locale.service';
import { LocaleCode } from '../../core/i18n/locale.types';
import { SeoService } from '../../core/seo/seo.service';
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
  private readonly localeService = inject(LocaleService);
  private readonly seoService = inject(SeoService);

  private readonly certificationId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );
  readonly certificationResource = resource<CertificationResponse, { id: string; locale: LocaleCode }>({
    params: () => {
      return { id: this.certificationId() ?? '', locale: this.localeService.locale() };
    },
    loader: ({ params }) => {
      if (!params.id) {
        return Promise.reject(new Error('No certification id provided'));
      }

      return firstValueFrom(this.certificationService.getCertification(params.id)).then((certification) => {
      this.seoService.update({
        title: `${certification.title} | ${this.ui().seo.certificationTitleSuffix} | Daniel Bartholdy`,
        description: certification.description ?? certification.title,
        keywords: this.ui().seo.keywords,
        image: certification.imageUrl ?? undefined,
        type: 'article',
        locale: params.locale,
        path: `/${this.route.snapshot.url.map(segment => segment.path).join('/')}`,
      });
      return certification;
      });
    },
  });
  readonly certification = this.certificationResource.value;
  readonly status = this.certificationResource.status;
  readonly error = this.certificationResource.error;
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

}
