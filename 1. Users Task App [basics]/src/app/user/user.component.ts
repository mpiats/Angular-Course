import { Component, Input, input, computed, signal, Output, output, EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
    selector: 'app-user',
    //standalone: true, // for components approach
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    //imports: [CardComponent] // for components approach
})
export class UserComponent {
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // //selectedUser = DUMMY_USERS[randomIndex]; // without signal

  // imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

  // // get imagePath(){
  // //   return 'assets/users/' + this.selectedUser.avatar;
  // // }

  // onSelectUser() {
  //   const randomIndex = Math.floor(Math.random()* DUMMY_USERS.length);
  //   this.selectedUser.set(DUMMY_USERS[randomIndex]);
  //   console.log(this.selectedUser().name + ' clicked');
  // }
  
  // @Input({required: true}) id!: string; // @Input means value can be set outside of component, since no value - put type, since no value put !
  // @Input({required: true}) avatar!: string; // @Input means value can be set outside of component, since no value - put type, since no value put !
  // @Input({required: true}) name!: string;
  // avatar = input.required<string>();// via signals
  // name = input.required<string>();
  //or
  
  @Input({required: true}) user! : User;
  @Input({required:true}) selected! :boolean;
  @Output() select = new EventEmitter<string>();
  //select = output<string>(); // modern alternative, it's not a signal, it's EventEmitter

  imagePath = computed(() => 'assets/users/' + this.user.avatar); // this is via signal, imagePath change only when avatar changes

  onSelectedUser(){
    this.select.emit(this.user.id);
  }

}
