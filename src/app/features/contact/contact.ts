import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { ContactData, contactsByLocale } from './contact.data';
import { LocaleService } from '../../core/i18n/locale.service';
import { RevealOnScrollDirective } from '../../shared/components/reveal-on-scroll.directive';

@Component({
  selector: 'bp-contact',
  imports: [NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly localeService = inject(LocaleService);
  readonly ui = this.localeService.translations;

  readonly contacts = computed<ContactData>(() => contactsByLocale[this.localeService.locale()]);
}
