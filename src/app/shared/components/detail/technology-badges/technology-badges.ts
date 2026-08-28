import { Component, input } from '@angular/core';

import { TechnologyBadge } from '../detail.models';
import { TechnologyBadgeComponent } from '../../technology-badge/technology-badge';

@Component({
  selector: 'bp-technology-badges',
  imports: [TechnologyBadgeComponent],
  templateUrl: './technology-badges.html',
  styleUrl: './technology-badges.scss',
})
export class TechnologyBadges {
  readonly technologies = input.required<readonly TechnologyBadge[]>();
}
