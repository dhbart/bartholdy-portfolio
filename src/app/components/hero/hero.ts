import { Component } from '@angular/core';
import { hero as heroData } from '../../data/hero';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'bp-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly hero = heroData;
}
