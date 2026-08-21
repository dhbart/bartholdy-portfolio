import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-info-card',
  templateUrl: './info-card.html',
  styleUrl: './info-card.scss',
})
export class InfoCard {
  readonly title = input<string>();
}
