import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from "./tasks/tasks.component";

@Component({
    selector: 'app-root',
    //standalone: true, for compoents approach
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    //imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent, NgFor, NgIf] for compoents approach
})
export class AppComponent {
  title = 'angular-app';
  users = DUMMY_USERS;
  selectedUserId = '';

  get selectedUser() { return this.users.find((user) => user.id === this.selectedUserId)} 

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
