import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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
  currentCount = computed(() => this.count());

  incrementCounter(): void {
    this.count.update(value => value + 1);
  }
}
