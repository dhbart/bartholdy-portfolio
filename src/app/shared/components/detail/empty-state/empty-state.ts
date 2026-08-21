import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bp-empty-state',
  imports: [RouterLink],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly title = input<string>();
  readonly message = input<string>();
  readonly linkLabel = input<string>();
  readonly link = input<string | readonly (string | number)[]>('/');
}
