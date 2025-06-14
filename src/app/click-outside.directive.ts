import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private zone = inject(NgZone);

  @Input() exclude = '';
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private excludeElements: HTMLElement[] = [];
  private events: string[] = ['click'];

  constructor() {
    this.eventListener = this.eventListener.bind(this);
  }

  ngOnInit() {
    if (this.exclude) {
      try {
        const elements = Array.from(
          document.querySelectorAll(this.exclude)
        ) as HTMLElement[];
        if (elements) {
          this.excludeElements = elements;
        }
      } catch (err) {
        console.error('Check the exclude selector syntax!', err);
      }
    }
    this.initEventListener();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.events.forEach((e) =>
        document.removeEventListener(e, this.eventListener)
      );
    });
  }

  private initEventListener() {
    this.zone.runOutsideAngular(() => {
      this.events.forEach((e) =>
        document.addEventListener(e, this.eventListener)
      );
    });
  }

  private eventListener(e: Event) {
    if (!e || !e.target) return;
    if (
      !this.elementRef.nativeElement.contains(e.target) &&
      !this.excludeElements.some((el) => el.contains(e.target as Node))
    ) {
      this.emit(e);
    }
  }

  private emit(e: Event) {
    this.zone.run(() => this.clickOutside.emit(e));
  }
}
