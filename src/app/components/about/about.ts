import { Component } from '@angular/core';
import { about as aboutData } from '../../data/about';

@Component({
  selector: 'bp-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly about = aboutData;
}
