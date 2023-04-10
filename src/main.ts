import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { worker } from './mocks/browser';
import { AppComponent } from './app/app.component';
import { TodoDetailComponent } from './app/todo-detail/todo-detail.component';
import { TodoListComponent } from './app/todo-list/todo-list.component';
import { CounterComponent } from './app/counter/counter.component';
import { HomeComponent } from './app/home/home.component';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ApiHttpInterceptor } from './app/http-interceptors/api-http-interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';

if (environment.production) {
  enableProdMode();
} else {
  worker.start();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'todo-list', component: TodoListComponent },
      { path: 'todo/:id', component: TodoDetailComponent },
    ]),
  ],
}).catch((err) => console.error(err));
