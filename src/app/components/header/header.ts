import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navigation as navigationData } from '../../data/navigation';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'bp-header',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly navigation = navigationData;
  readonly themeService = inject(ThemeService);
}
