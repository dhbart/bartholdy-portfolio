import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { LocaleCode } from '../../../core/i18n/locale.types';
import { LocaleService } from '../../../core/i18n/locale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bp-header',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly themeService = inject(ThemeService);

  readonly localeService = inject(LocaleService);
  readonly selectedLocale = this.localeService.currentSupportedLocale;

  changeLocale(event: Event): void {
    const locale = (event.target as HTMLSelectElement).value as LocaleCode;
    this.localeService.setLocale(locale);
  }


  readonly menus = this.localeService.translations;

  constructor(private readonly router: Router) {
  }

  onLogoClick(event: MouseEvent): void {

  event.preventDefault();

  this.router.navigate(['/']).then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

}

}
