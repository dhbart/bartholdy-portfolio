import { Component, computed, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { ProjectResponse } from './project.models';
import { ProjectService } from './project.service';
import { LocaleService } from '../../core/i18n/locale.service';
import { LoadingState } from '../../shared/components/detail/loading-state/loading-state';
import { TechnologyBadgeComponent } from '../../shared/components/technology-badge/technology-badge';

@Component({
  selector: 'bp-featured-project',
  imports: [NgOptimizedImage, LoadingState, TechnologyBadgeComponent],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly localeService = inject(LocaleService);

  readonly ui = this.localeService.translations;
  readonly projectsResource = resource<ProjectResponse[], string>({
    params: () => this.localeService.locale(),
    loader: () => firstValueFrom(this.projectService.getProjects()),
    defaultValue: [],
  });
  readonly project = computed(() => this.projectsResource.value()?.find(item => item.featured));
  readonly status = this.projectsResource.status;
  readonly error = this.projectsResource.error;

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
