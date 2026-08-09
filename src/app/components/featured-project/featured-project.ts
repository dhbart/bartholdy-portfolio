import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { featuredProject as featuredProjectData} from '../../data/featured-project';

@Component({
  selector: 'bp-featured-project',
  imports: [NgOptimizedImage, RouterLink ],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  private readonly router = inject(Router);

  readonly project = featuredProjectData;

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
