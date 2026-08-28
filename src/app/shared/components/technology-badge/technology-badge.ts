import { Component, computed, input, signal } from '@angular/core';

import { technologyIconUrl } from './technology-icon-map';

@Component({
  selector: 'bp-technology-badge',
  templateUrl: './technology-badge.html',
  styleUrl: './technology-badge.scss',
})
export class TechnologyBadgeComponent {
  readonly technology = input.required<string>();
  readonly iconUrl = computed(() => technologyIconUrl(this.technology()));
  readonly iconVisible = signal(true);

  hideIcon(): void {
    this.iconVisible.set(false);
  }
}
