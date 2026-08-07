import { Component } from '@angular/core';
import { hero as heroData } from '../../data/hero';

@Component({
  selector: 'bp-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly hero = heroData;
}
