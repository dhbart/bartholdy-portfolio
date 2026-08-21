import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-loading-state',
  templateUrl: './loading-state.html',
  styleUrl: './loading-state.scss',
})
export class LoadingState {
  readonly message = input('Loading...');
}
