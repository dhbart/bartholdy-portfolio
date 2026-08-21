import { Component, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { LoadingService } from '../../core/services/loading.service';
import { ProjectResponse } from './project.models';
import { ProjectService } from './project.service';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-featured-project',
  imports: [NgOptimizedImage ],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly project = signal<ProjectResponse | undefined>(undefined);

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      const request = this.loadingService
        .track(this.projectService.getProjects())
        .subscribe({
          next: (projects) => {
            const featured = projects.find(p => p.featured);
            this.project.set(featured);
          },
          error: (error) => console.error(`Failed to load featured project for ${locale}.`, error),
        });

      onCleanup(() => request.unsubscribe());
    });
  }

  openProject(id: string, event: MouseEvent): void {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('a, button')
    ) {
      return;
    }

    this.router.navigate(['/projects', id]);
  }

  onCardKeydown(event: KeyboardEvent, id: string): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.router.navigate(['/projects', id]);
    }
  }
}
