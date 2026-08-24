import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-skeleton',
  standalone: true,
  styleUrl: './skeleton.scss',
  template: '<span class="skeleton" [class.skeleton--text]="variant() === \'text\'" [class.skeleton--block]="variant() === \'block\'" [style.width]="width()" aria-hidden="true"></span>',
})
export class Skeleton {
  readonly variant = input<'text' | 'block'>('text');
  readonly width = input<string>('100%');
}
