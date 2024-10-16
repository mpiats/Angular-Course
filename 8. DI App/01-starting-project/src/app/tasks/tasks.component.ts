import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  //providers: [TasksService] // alternative of Injectable root, here if you have 2 <app-tasks> in html, then there will be 2 independent instances of Service(
})
export class TasksComponent {}
