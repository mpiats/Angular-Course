import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider] // Component provider (DI)
})
export class TasksListComponent {

  private tasksService = inject(TasksServiceToken); // made custom
  //private tasksService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => { // good approach since in case of changes this will be recomputed
    switch(this.selectedFilter()){
      case 'all': return this.tasksService.allTasks();
      case 'open': return this.tasksService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress': return this.tasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done': return this.tasksService.allTasks().filter(task => task.status === 'DONE');
      default: return this.tasksService.allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
