import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-section-title',
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {
  readonly title = input.required<string>();
}
