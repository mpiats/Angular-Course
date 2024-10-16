import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes } from './users/users.routes';
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(true) return true; // to check shouldGetAccess < 0.5

    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', // will be just <your-domain>/
        component: NoTaskComponent,
        title: 'No task selected here' // title in browser tab, can be resolver
    },
    // {
    //     path:'tasks', // <your-domain/tasks
    //     component: TasksComponent // component that should be loaded when this url is used
    // },
    {
        path: 'users/:userId', // component has userId field (<your-domain/users/<uid>)
        component: UserTasksComponent,
        children: userRoutes, // just anouther routes inside
        canMatch: [dummyCanMatch], // here can redirect or kinda deny access to route and url won't change
        data: { // can put this data into component, but need to declare input with the same name, but here for static data
            message: 'Hello!'
        },
        resolve: { // for dynamic data
            userName: resolveUserName // value computed here will be avaible to component
        },
        title: resolveTitle
    },
    {
        path: '**', // default route, appears in case user tried to access wrong url
        component: NotFoundComponent
    }
]