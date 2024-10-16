import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// !!! there are the same applications without signals and with modules instead of standalones
//https://github.com/mschwarzmueller/angular-complete-guide-course-resources/tree/main/code-snapshots/09-services-deep-dive/services-ngmodules
//https://github.com/mschwarzmueller/angular-complete-guide-course-resources/tree/main/code-snapshots/09-services-deep-dive/services-nosignals


// bootstrapApplication(AppComponent,
//      {
//         providers: [TasksService] //alternative way of Injectable root, this is 
//      }).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token'); 

bootstrapApplication(AppComponent,
     {
        providers: [{provide: TasksServiceToken, useClass: TasksService}] // in case we need custom injection
     }).catch((err) => console.error(err));