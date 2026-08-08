import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getProjectById } from '../../data/projects';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-details',
  imports: [RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  project: any;

  constructor(
    private route: ActivatedRoute
  ) {  }

    ngOnInit() {

		const id = this.route.snapshot.paramMap.get('id');

		this.project = getProjectById(id);

    }

}
