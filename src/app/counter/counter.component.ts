import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
    imports: [
      TranslateModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  private readonly count = signal(0);
  readonly currentCount = computed(() => this.count());

  @HostListener('window:keydown.space', ['$event'])
  @HostListener('window:keydown.enter', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    event.preventDefault();
    this.incrementCounter();
  }

  incrementCounter(): void {
    this.count.update(value => value + 1);
  }

  resetCounter(): void {
    this.count.set(0);
  }
}
