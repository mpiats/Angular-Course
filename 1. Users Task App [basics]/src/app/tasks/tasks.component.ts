import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskData, Task } from './task/task.model';
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksService } from './tasks.service';

@Component({
    selector: 'app-tasks',
    //standalone: true, for components approach
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    //imports: [TaskComponent, NewTaskComponent]
})
export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name!: string;
  isAddingTask = false;
  //private tasksSevice: TasksService;
  
  constructor(private tasksService: TasksService) {}

  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask(){
    this.isAddingTask = true;
  }

  onCloseAddTask(){
    this.isAddingTask = false;
  }

  // onAddTask(task: NewTaskData){
  //   this.tasksService.addTask(task, this.userId);
  // }

  // onCompleteTask(id: string){
  //   this.tasksService.removeTask(id);
  // }

  // onAddTask(task: NewTaskData){
  //   this.tasks.unshift({
  //     id: new Date().getTime().toString(),
  //     userId: this.userId,
  //     title: task.title,
  //     summary: task.summary,
  //     dueDate: task.date
  //   });
  //   this.isAddingTask = false;
  // }
}
