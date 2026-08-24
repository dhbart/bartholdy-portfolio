import { Component, input } from '@angular/core';
import { Skeleton } from './skeleton';

@Component({
  selector: 'bp-loading-state',
  imports: [Skeleton],
  templateUrl: './loading-state.html',
  styleUrl: './loading-state.scss',
})
export class LoadingState {
  readonly message = input('Loading...');
}
