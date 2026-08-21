import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { ContactData, contactsByLocale } from './contact.data';
import { LocaleService } from '../../core/i18n/locale.service';

@Component({
  selector: 'bp-contact',
  imports: [NgOptimizedImage],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly localeService = inject(LocaleService);

  readonly contacts = signal<ContactData | null>(null);

  constructor() {
    effect((onCleanup) => {
      const locale = this.localeService.locale();
      this.contacts.set(contactsByLocale[locale]);
    });
  }
}
