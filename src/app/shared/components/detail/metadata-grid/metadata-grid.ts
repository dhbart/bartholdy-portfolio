import { Component, input } from '@angular/core';

import { DetailMetadata } from '../detail.models';

@Component({
  selector: 'bp-metadata-grid',
  templateUrl: './metadata-grid.html',
  styleUrl: './metadata-grid.scss',
})
export class MetadataGrid {
  readonly items = input.required<readonly DetailMetadata[]>();
}
