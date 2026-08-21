import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../core/services/loading.service';
import { ProjectResponse } from '../../features/projects/project.models';
import { ProjectService } from '../../features/projects/project.service';
import { LocaleService } from '../../core/i18n/locale.service';
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
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly project = signal<ProjectResponse | undefined>(undefined);
  readonly status = signal<'loading' | 'loaded' | 'error'>('loading');
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

  constructor() {
    effect((onCleanup) => {
      const slug = this.route.snapshot.paramMap.get('id');
      const locale = this.localeService.locale();

      if (!slug) {
        console.error('No project slug provided');
        this.status.set('error');
        return;
      }

      this.project.set(undefined);
      this.status.set('loading');

      const request = this.loadingService
        .track(this.projectService.getProject(slug))
        .subscribe({
          next: (project) => {
            this.project.set(project);
            this.status.set('loaded');
          },
          error: (error) => {
            this.status.set('error');
            console.error(`Failed to load project ${slug} for ${locale}.`, error);
          },
        });

      onCleanup(() => request.unsubscribe());
    });
  }
}
