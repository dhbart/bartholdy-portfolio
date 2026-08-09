import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { getProjectById, Project } from '../../data/projects';

@Component({
  selector: 'bp-project-details',
  imports: [RouterLink, NgOptimizedImage ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  private readonly route = inject(ActivatedRoute);

  project: Project | undefined;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = getProjectById(id);
  }
}
