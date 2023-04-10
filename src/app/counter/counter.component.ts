import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class CounterComponent {
  public currentCount = 0;

  public incrementCounter() : void {
    this.currentCount++;
  }
}
