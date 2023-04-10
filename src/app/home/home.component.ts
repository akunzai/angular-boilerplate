import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class HomeComponent {
  environment = environment;
}
