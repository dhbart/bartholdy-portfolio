import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'bp-image-preview',
  imports: [NgOptimizedImage],
  templateUrl: './image-preview.html',
  styleUrl: './image-preview.scss',
})
export class ImagePreview {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly width = input(1280);
  readonly height = input(720);
}
