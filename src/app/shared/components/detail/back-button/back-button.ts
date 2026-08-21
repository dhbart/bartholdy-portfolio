import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bp-back-button',
  imports: [RouterLink],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  readonly label = input.required<string>();
  readonly link = input<string | readonly (string | number)[]>('/');
  readonly fragment = input<string>();
}
