import { Component } from '@angular/core';
import { experiences as experiencesData } from '../../data/experience'

@Component({
  selector: 'bp-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly experiences = experiencesData;
}
