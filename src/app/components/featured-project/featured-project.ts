import { Component } from '@angular/core';
import { featuredProject as featuredProjectData} from '../../data/featured-project';

@Component({
  selector: 'bp-featured-project',
  imports: [],
  templateUrl: './featured-project.html',
  styleUrl: './featured-project.scss',
})
export class FeaturedProject {
  readonly project = featuredProjectData;
}
