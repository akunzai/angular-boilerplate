import { Component, OnInit } from '@angular/core';

// https://angular.io/guide/build
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  environment = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
