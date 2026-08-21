import { Component, computed, input } from '@angular/core';

import { ExternalLink } from '../detail.models';

@Component({
  selector: 'bp-external-links',
  templateUrl: './external-links.html',
  styleUrl: './external-links.scss',
})
export class ExternalLinks {
  readonly links = input.required<readonly ExternalLink[]>();
  readonly visibleLinks = computed(() =>
    this.links().filter((link) => link.url && link.url !== '#'),
  );
}
