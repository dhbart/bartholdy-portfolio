import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, ElementRef, NgZone, Renderer2, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../../core/i18n/locale.service';
import { AssistantMessage } from './assistant.models';
import { AssistantService } from './assistant.service';

interface ButtonPosition { left: number; top: number; }
interface PanelPosition { left: number; top: number; }

@Component({
  selector: 'bp-assistant',
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './assistant.html',
  styleUrl: './assistant.scss',
})
export class Assistant {
  readonly localeService = inject(LocaleService);
  private readonly assistantService = inject(AssistantService);
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly launcher = viewChild<ElementRef<HTMLButtonElement>>('launcher');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly messageList = viewChild<ElementRef<HTMLElement>>('messageList');
  private readonly input = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  protected readonly isOpen = signal(false);
  protected readonly isThinking = signal(false);
  protected readonly error = signal(false);
  protected readonly draft = signal('');
  protected readonly messages = signal<AssistantMessage[]>([]);
  protected readonly buttonPosition = signal<ButtonPosition | null>(null);
  protected readonly panelPosition = signal<PanelPosition | null>(null);

  private messageId = 0;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOrigin: ButtonPosition = { left: 0, top: 0 };
  private isDragging = false;
  private isDraggingLauncher = false;
  private hasMoved = false;
  private ignoreNextClick = false;
  private removePointerMove?: () => void;
  private removePointerUp?: () => void;
  private removePointerCancel?: () => void;

  constructor() {
    effect(() => { this.messages(); queueMicrotask(() => this.scrollToLatest()); });
    this.destroyRef.onDestroy(() => this.stopDragging());
  }

  protected toggleChat(): void {
    if (this.ignoreNextClick) { this.ignoreNextClick = false; return; }
    this.isOpen.update(open => !open);
    queueMicrotask(() => this.isOpen() ? this.input()?.nativeElement.focus() : this.launcher()?.nativeElement.focus());
  }

  protected closeChat(): void {
    this.isOpen.set(false);
    queueMicrotask(() => this.launcher()?.nativeElement.focus());
  }

  protected clearConversation(): void {
    this.messages.set([]);
    this.error.set(false);
  }

  protected onDraftInput(value: string): void { this.draft.set(value); }

  protected onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); this.sendMessage(); }
  }

  protected sendMessage(): void {
    const content = this.draft().trim();
    if (!content || this.isThinking()) { return; }
    console.debug('[Assistant] Sending message', {
      messageLength: content.length,
      messagePreview: content.slice(0, 80),
    });
    this.messages.update(messages => [...messages, this.createMessage('user', content)]);
    this.draft.set('');
    this.error.set(false);
    this.isThinking.set(true);
    this.assistantService.chat(content).subscribe({
      next: response => {
        console.debug('[Assistant] Response rendered', {
          responseLength: response.length,
        });
        this.messages.update(messages => [...messages, this.createMessage('assistant', response)]);
        this.isThinking.set(false);
      },
      error: error => {
        console.error('[Assistant] Displaying unavailable state', {
          errorName: error instanceof Error ? error.name : typeof error,
          errorMessage: error instanceof Error ? error.message : error,
          status: error?.status,
          details: error?.details,
        });
        this.error.set(true);
        this.isThinking.set(false);
      },
    });
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) { this.closeChat(); }
  }

  protected onPanelPointerdown(event: PointerEvent): void {
    const target = event.target;
    if (target instanceof Element && target.closest('button')) { return; }

    const panel = this.panel()?.nativeElement;
    const header = target instanceof Element ? target.closest('.assistant-header') : null;
    if (!panel || !header) { return; }

    const bounds = panel.getBoundingClientRect();
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragOrigin = { left: bounds.left, top: bounds.top };
    this.hasMoved = false;
    this.isDragging = true;
    this.isDraggingLauncher = false;
    (header as HTMLElement).setPointerCapture?.(event.pointerId);
    event.preventDefault();

    this.ngZone.runOutsideAngular(() => {
      this.removePointerMove = this.renderer.listen(this.document, 'pointermove', (move: PointerEvent) => this.onPanelPointermove(move));
      this.removePointerUp = this.renderer.listen(this.document, 'pointerup', () => this.stopDragging());
      this.removePointerCancel = this.renderer.listen(this.document, 'pointercancel', () => this.stopDragging());
    });
  }

  private onPanelPointermove(event: PointerEvent): void {
    if (!this.isDragging) { return; }
    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;
    if (!this.hasMoved && Math.hypot(deltaX, deltaY) < 4) { return; }

    const panel = this.panel()?.nativeElement;
    const header = panel?.querySelector<HTMLElement>('.assistant-header');
    if (!panel || !header) { return; }

    this.hasMoved = true;
    const bounds = panel.getBoundingClientRect();
    const headerBounds = header.getBoundingClientRect();
    const visibleHeader = Math.min(48, headerBounds.width || 48, headerBounds.height || 48);
    const minLeft = bounds.width <= window.innerWidth ? 0 : visibleHeader - bounds.width;
    const maxLeft = bounds.width <= window.innerWidth ? window.innerWidth - bounds.width : window.innerWidth - visibleHeader;
    const minTop = bounds.height <= window.innerHeight ? 0 : visibleHeader - bounds.height;
    const maxTop = bounds.height <= window.innerHeight ? window.innerHeight - bounds.height : window.innerHeight - visibleHeader;
    this.panelPosition.set({
      left: Math.min(maxLeft, Math.max(minLeft, this.dragOrigin.left + deltaX)),
      top: Math.min(maxTop, Math.max(minTop, this.dragOrigin.top + deltaY)),
    });
    event.preventDefault();
  }

  protected onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') { event.preventDefault(); this.closeChat(); }
  }

  protected formatTime(date: Date): string {
    return new Intl.DateTimeFormat(this.localeService.locale(), { hour: '2-digit', minute: '2-digit' }).format(date);
  }

  protected renderMarkdown(markdown: string): string {
    let html = this.escapeHtml(markdown).replace(/\x60{3}(\w+)?\n?([\s\S]*?)\x60{3}/g, (_match, language = '', code: string) =>
      '<pre class="assistant-code"><button type="button" class="assistant-copy" data-code-id="0">' + this.copyLabel() +
      '</button><code class="language-' + language + '">' + this.highlightCode(code.trimEnd()) + '</code></pre>');
    html = html
      .replace(/^### (.+)$/gm, '<h4>$1</h4>').replace(/^## (.+)$/gm, '<h3>$1</h3>').replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/^[-*] (.+)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/\x60([^\x60\n]+)\x60/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  protected async copyCode(event: MouseEvent): Promise<void> {
    const target = event.target as HTMLElement;
    const code = target.parentElement?.querySelector('code')?.textContent;
    if (target.dataset['codeId'] !== undefined && code && navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      target.textContent = this.localeService.translations().assistant.copied;
    }
  }

  protected onLauncherPointerdown(event: PointerEvent): void {
    const button = this.launcher()?.nativeElement;
    if (!button) { return; }
    const bounds = button.getBoundingClientRect();
    this.dragStartX = event.clientX; this.dragStartY = event.clientY;
    this.dragOrigin = { left: bounds.left, top: bounds.top };
    this.hasMoved = false; this.isDragging = true;
    this.isDraggingLauncher = true;
    button.setPointerCapture?.(event.pointerId); event.preventDefault();
    this.removePointerMove = this.renderer.listen(this.document, 'pointermove', (move: PointerEvent) => this.onPointermove(move));
    this.removePointerUp = this.renderer.listen(this.document, 'pointerup', () => this.stopDragging());
  }

  private onPointermove(event: PointerEvent): void {
    if (!this.isDragging) { return; }
    const deltaX = event.clientX - this.dragStartX; const deltaY = event.clientY - this.dragStartY;
    if (!this.hasMoved && Math.hypot(deltaX, deltaY) < 4) { return; }
    this.hasMoved = true;
    const button = this.launcher()?.nativeElement;
    if (!button) { return; }
    this.buttonPosition.set({
      left: Math.min(Math.max(0, window.innerWidth - button.offsetWidth), Math.max(0, this.dragOrigin.left + deltaX)),
      top: Math.min(Math.max(0, window.innerHeight - button.offsetHeight), Math.max(0, this.dragOrigin.top + deltaY)),
    });
    event.preventDefault();
  }

  private stopDragging(): void {
    if (!this.isDragging) { return; }
    this.isDragging = false;
    if (this.isDraggingLauncher && this.hasMoved) { this.ignoreNextClick = true; }
    this.isDraggingLauncher = false;
    this.removePointerMove?.(); this.removePointerUp?.();
    this.removePointerCancel?.();
    this.removePointerMove = undefined; this.removePointerUp = undefined; this.removePointerCancel = undefined;
  }

  private createMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
    return { id: ++this.messageId, role, content, createdAt: new Date() };
  }

  private scrollToLatest(): void {
    const list = this.messageList()?.nativeElement;
    if (list) { list.scrollTop = list.scrollHeight; }
  }

  private copyLabel(): string { return this.localeService.translations().assistant.copy; }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  private highlightCode(code: string): string {
    return code.replace(/\b(const|let|function|return|class|interface|public|private|new|if|else)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/(['"])([^'"]*?)\1/g, '<span class="token-string">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
  }

  protected readonly launcherStyle = (): { left: string; top: string } | null => {
    const position = this.buttonPosition();
    return position ? { left: position.left + 'px', top: position.top + 'px' } : null;
  };

  protected readonly panelStyle = (): { left: string; top: string } | null => {
    const position = this.panelPosition();
    return position ? { left: position.left + 'px', top: position.top + 'px' } : null;
  };
}
