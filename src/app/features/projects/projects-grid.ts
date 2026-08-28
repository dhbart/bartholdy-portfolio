import { NgOptimizedImage } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { ProjectResponse } from './project.models';
import { ProjectService } from './project.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { RevealOnScrollDirective } from '../../shared/components/reveal-on-scroll.directive';
import { TechnologyBadgeComponent } from '../../shared/components/technology-badge/technology-badge';

@Component({
  selector: 'bp-projects-grid',
  imports: [RouterLink, NgOptimizedImage, LoadingState, RevealOnScrollDirective, TechnologyBadgeComponent],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss',
})
export class ProjectsGrid {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly projectsResource = resource<ProjectResponse[], string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.projectService.getProjects()),
    defaultValue: [],
  });
  readonly projects = this.projectsResource.value;
  readonly status = this.projectsResource.status;
  readonly error = this.projectsResource.error;

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
