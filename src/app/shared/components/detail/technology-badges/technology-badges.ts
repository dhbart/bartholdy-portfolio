import { Component, input } from '@angular/core';

import { TechnologyBadge } from '../detail.models';

@Component({
  selector: 'bp-technology-badges',
  templateUrl: './technology-badges.html',
  styleUrl: './technology-badges.scss',
})
export class TechnologyBadges {
  readonly technologies = input.required<readonly TechnologyBadge[]>();
}
