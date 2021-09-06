import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import TodoService from './todo.service';
import XhrTodoService from './todo.service.xhr';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'todo-list', component: TodoListComponent },
      { path: 'todo/:id', component: TodoDetailComponent },
    ]),
    ...(environment.useHttpClient ? [HttpClientModule] : []),
  ],
  declarations: [
    AppComponent,
    CounterComponent,
    NavMenuComponent,
    HomeComponent,
    TodoListComponent,
    TodoDetailComponent,
  ],
  providers: [
    {
      provide: TodoService,
      useClass: environment.useHttpClient ? XhrTodoService : TodoService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
