import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { projects as projectsData } from '../../data/projects';

@Component({
  selector: 'bp-projects-grid',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss',
})
export class ProjectsGrid {
  private readonly router = inject(Router);

  readonly projects = projectsData.filter(
    project => !project.featured
  );

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
