import { Component } from '@angular/core';
import { projects } from '../../data/projects';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'bp-projects-grid',
  imports: [RouterLink],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss',
})
export class ProjectsGrid {
  readonly projects =
      projects.filter(project => !project.featured);
}
