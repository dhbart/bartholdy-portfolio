import { Component, computed, inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

import { ProjectResponse } from '../../features/projects/project.models';
import { ProjectService } from '../../features/projects/project.service';
import { LocaleCode } from '../../core/i18n/locale.types';
import { LocaleService } from '../../core/i18n/locale.service';
import { SeoService } from '../../core/seo/seo.service';
import { BackButton } from '../../shared/components/detail/back-button/back-button';
import { DetailHeader } from '../../shared/components/detail/detail-header/detail-header';
import { EmptyState } from '../../shared/components/detail/empty-state/empty-state';
import { ExternalLink } from '../../shared/components/detail/detail.models';
import { ExternalLinks } from '../../shared/components/detail/external-links/external-links';
import { ImagePreview } from '../../shared/components/detail/image-preview/image-preview';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { SectionTitle } from '../../shared/components/detail/section-title/section-title';
import { TechnologyBadges } from '../../shared/components/detail/technology-badges/technology-badges';

@Component({
  selector: 'bp-project-details',
  imports: [
    BackButton,
    DetailHeader,
    EmptyState,
    ExternalLinks,
    ImagePreview,
    LoadingState,
    SectionTitle,
    TechnologyBadges,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly localeService = inject(LocaleService);
  private readonly seoService = inject(SeoService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );
  readonly projectResource = resource<ProjectResponse, { slug: string; locale: LocaleCode }>({
    params: () => {
      return { slug: this.slug() ?? '', locale: this.localeService.locale() };
    },
    loader: ({ params }) => {
      if (!params.slug) {
        return Promise.reject(new Error('No project slug provided'));
      }

      return firstValueFrom(this.projectService.getProject(params.slug)).then((project) => {
      this.seoService.update({
        title: `${project.title} | ${this.ui().seo.projectTitleSuffix} | Daniel Bartholdy`,
        description: project.description,
        keywords: this.ui().seo.keywords,
        image: project.imageUrl,
        type: 'article',
        locale: params.locale,
        path: `/${this.route.snapshot.url.map(segment => segment.path).join('/')}`,
      });
      return project;
      });
    },
  });
  readonly project = this.projectResource.value;
  readonly status = this.projectResource.status;
  readonly error = this.projectResource.error;
  readonly ui = this.localeService.translations;
  readonly externalLinks = computed<readonly ExternalLink[]>(() => {
    const project = this.project();

    if (!project) {
      return [];
    }

    return [
      { label: 'GitHub', url: project.githubUrl, type: 'github' },
      { label: this.ui().projectDetails.liveDemo, url: project.demoUrl, type: 'demo' },
    ];
  });

}
