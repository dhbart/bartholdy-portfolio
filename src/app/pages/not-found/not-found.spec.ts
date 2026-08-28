import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';

import { provideRouter } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { NotFound } from './not-found';

describe('NotFound', () => {
  let fixture: ComponentFixture<NotFound>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [LocaleService, provideRouter([])],
    });
    fixture = TestBed.createComponent(NotFound);
    fixture.detectChanges();
  });

  it('renders a localized manual home action without scheduling redirects', () => {
    expect(fixture.nativeElement.textContent).toContain('Página não encontrada');
    expect(fixture.nativeElement.querySelector('a[routerlink="/"]')).not.toBeNull();
  });
});
