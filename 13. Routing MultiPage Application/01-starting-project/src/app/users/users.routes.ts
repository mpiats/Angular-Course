import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always', // by default resolve is re executed when url changes, but not query params. So now it will be reexecuted
    resolve: {
      userTasks: resolveUserTasks, 
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage], // checks if user can leave the page
  },
];
//version with comments
// import { Routes } from "@angular/router";
// import { TasksComponent } from "../tasks/tasks.component";
// import { NewTaskComponent } from "../tasks/new-task/new-task.component";

// export const routes: Routes = [
//     {
//         path: '', // on base url we want to redirect to tasks, so http://localhost:4200/users/u3/ will be http://localhost:4200/users/u3/tasks
//         redirectTo: 'tasks',
//         pathMatch: 'full' // way of analysing url, will look at all url
//     },
//     {
//         path: 'tasks', // <your-domain/users/<uid>/tasks
//         component: TasksComponent
//     },
//     {
//         path: 'tasks/new',
//         component: NewTaskComponent
//     }
// ]