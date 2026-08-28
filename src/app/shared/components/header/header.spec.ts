import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { Header } from './header';
import { LocaleService } from '../../../core/i18n/locale.service';
import { ThemeService } from '../../../core/services/theme.service';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;

  beforeEach(() => {
    localStorage.clear();
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: () => ({ matches: false }),
      });
    }
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    TestBed.configureTestingModule({ imports: [Header], providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
  });

  it('renders an accessible navigation and updates locale from the selector', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBeTruthy();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'en-US';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(TestBed.inject(LocaleService).locale()).toBe('en-US');
    expect(select.getAttribute('aria-labelledby')).toBe('language-label');
  });

  it.each([
    ['pt-BR', '🇧🇷'],
    ['en-US', '🇺🇸'],
    ['es-ES', '🇪🇸'],
  ] as const)('keeps the selector synchronized with the active locale after changes (%s)', (locale, emoji) => {
    const localeService = TestBed.inject(LocaleService);
    localeService.setLocale(locale);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.value).toBe(locale);
    expect(select.selectedOptions[0].textContent).toContain(emoji);
  });

  it('toggles theme through the keyboard-operable button', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-pressed')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(TestBed.inject(ThemeService).isDark()).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.getAttribute('aria-label')).toContain('claro');
  });

  it('navigates home and resets scroll when the logo is activated', async () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    (fixture.nativeElement.querySelector('.header__logo') as HTMLAnchorElement).click();
    expect(navigate).toHaveBeenCalledWith(['/']);
    await Promise.resolve();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
