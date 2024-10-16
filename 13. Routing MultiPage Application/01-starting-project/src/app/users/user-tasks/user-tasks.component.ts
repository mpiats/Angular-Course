import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {

  // 1. way to read data from url - inputs
  // userId = input.required<string>(); // to be able to read info from url, also need to add withComponentInputBinding() to my appConfig
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
  // 2. way ActivatedRoute approach instead inputs
  // for ActivatedRoute approach instead inputs, but then I replaced it with resolver
  // ngOnInit(): void {
  //   console.log('Input Data: ' + this.message());

  //   console.log(this.activatedRoute.snapshot);// snapshot contains just values, not observables and so on
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: paramMap => this.userName = this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name || '',
  //   });

  // 3. create a resolver
  //alternative of inputs, but replaced by resolver
  
  userName = input.required<string>();
  message = input.required<string>();

  // private destroyRef = inject(DestroyRef);
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  //4.

  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit(){
  //   this.activatedRoute.data.subscribe({ // activated Route contains info static and dynamic that we pushed, look in the route file
  //     next: data => {
  //       console.log(data);
        
  //     }
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}

export const resolveTitle: ResolveFn<string> = (ActivatedRoute, routerState) => {
  return resolveUserName(ActivatedRoute, routerState) + '\'s Tasks';
}
