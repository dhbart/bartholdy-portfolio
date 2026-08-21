import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

import { LoadingService } from '../../core/services/loading.service';
import { ProjectResponse } from '../../features/projects/project.models';
import { ProjectService } from '../../features/projects/project.service';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-project-details',
  imports: [RouterLink, NgOptimizedImage ],
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
