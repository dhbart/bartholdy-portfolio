import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService } from '../../../core/api/api.service';
import { httpErrorInterceptor } from '../../../core/interceptors/http-error.interceptor';
import { localeHeaderInterceptor } from '../../../core/interceptors/locale-header.interceptor';
import { LocaleService } from '../../../core/i18n/locale.service';
import { HttpErrorHandlerService } from '../../../core/services/http-error-handler.service';
import { Assistant } from './assistant';

describe('Assistant integration with API', () => {
  let fixture: ComponentFixture<Assistant>;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [Assistant],
      providers: [
        ApiService,
        LocaleService,
        HttpErrorHandlerService,
        provideHttpClient(withInterceptors([localeHeaderInterceptor, httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(Assistant);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('drags the panel from its header and restores its position after reopening', () => {
    const launcher = fixture.nativeElement.querySelector('.assistant-launcher') as HTMLButtonElement;
    launcher.click();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.assistant-panel') as HTMLElement;
    const header = panel.querySelector('.assistant-header') as HTMLElement;
    vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue({
      left: 200, top: 100, width: 420, height: 650, right: 620, bottom: 750,
      x: 200, y: 100, toJSON: () => ({}),
    });
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      left: 200, top: 100, width: 420, height: 70, right: 620, bottom: 170,
      x: 200, y: 100, toJSON: () => ({}),
    });

    header.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 220, clientY: 120, pointerId: 1 }));
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 320, clientY: 180, pointerId: 1 }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
    fixture.detectChanges();

    expect(panel.style.left).toBe('300px');
    expect(panel.style.top).toBe(`${Math.min(160, window.innerHeight - 650)}px`);

    (panel.querySelector('.assistant-header__actions button:last-child') as HTMLButtonElement).click();
    fixture.detectChanges();
    launcher.click();
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('.assistant-panel') as HTMLElement).style.left).toBe('300px');
  });

  it('does not start a panel drag from header action buttons', () => {
    fixture.nativeElement.querySelector('.assistant-launcher').click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.assistant-panel') as HTMLElement;
    const clearButton = panel.querySelector('.assistant-header__actions button') as HTMLButtonElement;
    clearButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 10, pointerId: 2 }));
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 300, clientY: 300, pointerId: 2 }));
    fixture.detectChanges();
    expect(panel.style.left).toBe('');
    expect(panel.style.top).toBe('');
  });

  it('sends a message through the API and renders the assistant response', async () => {
    fixture.nativeElement.querySelector('.assistant-launcher').click();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('#assistant-input') as HTMLTextAreaElement;
    input.value = 'What projects has Daniel built?';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.assistant-send').click();
    fixture.detectChanges();

    const request = http.expectOne('/api/v1/assistant/chat');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ message: 'What projects has Daniel built?' });
    expect(request.request.headers.get('Accept-Language')).toBe('pt-BR');
    expect(fixture.nativeElement.querySelector('.assistant-thinking')?.textContent)
      .toContain('Daniel está pensando...');

    request.flush({ response: '**Daniel** has built several projects.' });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.assistant-messages')?.textContent)
      .toContain('What projects has Daniel built?');
    expect(fixture.nativeElement.querySelector('.assistant-bubble strong')?.textContent)
      .toBe('Daniel');
    expect(fixture.nativeElement.querySelector('.assistant-thinking')).toBeNull();
  });

  it('shows a friendly error when the API is unavailable', () => {
    fixture.nativeElement.querySelector('.assistant-launcher').click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#assistant-input') as HTMLTextAreaElement;
    input.value = 'Tell me about Daniel';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.assistant-send').click();

    http.expectOne('/api/v1/assistant/chat').flush(
      { status: 503, message: 'Service unavailable' },
      { status: 503, statusText: 'Service Unavailable' },
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.assistant-error')?.textContent)
      .toContain('temporariamente indisponível');
  });

  it.each([
    ['pt-BR', 'Daniel está pensando...'],
    ['en-US', 'Daniel is thinking...'],
    ['es-ES', 'Daniel está pensando...'],
  ] as const)('renders thinking feedback in %s', (locale, expectedMessage) => {
    const localeService = TestBed.inject(LocaleService);
    localeService.setLocale(locale);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.assistant-launcher').click();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#assistant-input') as HTMLTextAreaElement;
    input.value = 'Tell me about Daniel';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.assistant-send').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.assistant-thinking')?.textContent)
      .toContain(expectedMessage);
    http.expectOne('/api/v1/assistant/chat').flush({ response: 'ok' });
  });
});
