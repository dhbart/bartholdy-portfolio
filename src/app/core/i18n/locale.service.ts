import { computed, Injectable, signal } from '@angular/core';

import { TRANSLATIONS } from './translations';
import { SUPPORTED_LOCALES } from './supported-locales';
import { LocaleCode } from './locale.types';

const DEFAULT_LOCALE: LocaleCode = 'pt-BR';
const LOCALE_STORAGE_KEY = 'locale';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  readonly supportedLocales = SUPPORTED_LOCALES;

  private readonly currentLocale = signal<LocaleCode>(
    this.restoreLocale()
  );

  readonly locale = this.currentLocale.asReadonly();

  readonly currentSupportedLocale = computed(() =>
    this.supportedLocales.find(
      locale => locale.code === this.currentLocale()
    )!
  );

  readonly translations = computed(() =>
    TRANSLATIONS[this.currentLocale()]
  );

  setLocale(locale: LocaleCode): void {

    if (!this.isSupportedLocale(locale)) {
      return;
    }

    this.currentLocale.set(locale);

    localStorage.setItem(
      LOCALE_STORAGE_KEY,
      locale
    );

  }

  private restoreLocale(): LocaleCode {

    const savedLocale = localStorage.getItem(
      LOCALE_STORAGE_KEY
    );

    return this.isSupportedLocale(savedLocale)
      ? savedLocale
      : DEFAULT_LOCALE;

  }

  private isSupportedLocale(
    locale: string | null
  ): locale is LocaleCode {

    return this.supportedLocales.some(
      supported => supported.code === locale
    );

  }

}
