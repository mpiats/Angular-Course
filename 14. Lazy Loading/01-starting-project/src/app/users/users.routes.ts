import { ResolveFn, Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';
import { inject } from '@angular/core';
import { Task } from '../tasks/task/task.model';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        providers: [TasksService], // we put all routes here in children of this route to efficiently inject TasksService
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        //loadComponent: () => import('../tasks/tasks.component').then(mod => mod.TasksComponent), // when route will be activated, 
        //then TasksComponent will be loaded. We do it instead usual import {}
        //!!! important need to make sure noting from ../tasks/tasks.component is imported eagily since it anyway will load the whole file
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ],
  },
];



