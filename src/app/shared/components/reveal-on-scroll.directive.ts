import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, Renderer2, inject, input } from '@angular/core';

@Directive({ selector: '[bpRevealOnScroll]', standalone: true })
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  readonly delay = input<number | string>(0, { alias: 'bpRevealDelay' });
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const delay = this.delay();
    this.renderer.setStyle(host, '--reveal-delay', typeof delay === 'number' ? `${delay}ms` : delay);
    this.renderer.addClass(host, 'reveal-on-scroll');

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(host, 'is-revealed');
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        this.renderer.addClass(host, 'is-revealed');
        this.observer?.disconnect();
      }, { threshold: 0.12 });
      this.observer.observe(host);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
