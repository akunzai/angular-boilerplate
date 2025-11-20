/// <reference types="@angular/localize" />

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app/app.component';
import { CounterComponent } from './app/counter/counter.component';
import { HomeComponent } from './app/home/home.component';
import { ApiHttpInterceptor } from './app/http-interceptors/api-http-interceptor';
import { TodoDetailComponent } from './app/todo-detail/todo-detail.component';
import { TodoListComponent } from './app/todo-list/todo-list.component';
import { environment } from './environments/environment';
import { worker } from './mocks/browser';

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
    provideZonelessChangeDetection(),
  ],
}).catch((err) => console.error(err));
