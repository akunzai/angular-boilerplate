import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  public currentCount = 0;

  constructor() {}

  public incrementCounter() {
    this.currentCount++;
  }
}
