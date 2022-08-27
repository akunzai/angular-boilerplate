import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ApiHttpInterceptor } from './http-interceptors/api-http-interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'todo-list', component: TodoListComponent },
      { path: 'todo/:id', component: TodoDetailComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    CounterComponent,
    NavMenuComponent,
    HomeComponent,
    TodoListComponent,
    TodoDetailComponent,
    ClickOutsideDirective,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
