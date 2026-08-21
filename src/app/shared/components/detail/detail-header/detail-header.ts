import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-detail-header',
  imports: [NgOptimizedImage],
  templateUrl: './detail-header.html',
  styleUrl: './detail-header.scss',
})
export class DetailHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly type = input<string>();
  readonly imageUrl = input<string>();
  readonly imageAlt = input<string>('');
}
