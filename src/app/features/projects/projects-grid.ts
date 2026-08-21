import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LoadingService } from '../../core/services/loading.service';
import { ProjectResponse } from './project.models';
import { ProjectService } from './project.service';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-projects-grid',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss',
})
export class ProjectsGrid {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly loadingService = inject(LoadingService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly projects = signal<ProjectResponse[]>([]);

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      const request = this.loadingService
        .track(this.projectService.getProjects())
        .subscribe({
          next: (projects) => this.projects.set(projects),
          error: (error) => console.error(`Failed to load Project data for ${locale}.`, error),
        });

      onCleanup(() => request.unsubscribe());
    });
  }

  openProject(slug: string, event: MouseEvent): void {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('a, button')
    ) {
      return;
    }

    this.router.navigate(['/projects', slug]);
  }

  onCardKeydown(event: KeyboardEvent, slug: string): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.router.navigate(['/projects', slug]);
    }
  }
}
