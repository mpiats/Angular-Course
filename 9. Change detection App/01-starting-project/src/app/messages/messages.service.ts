import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {

  // messages$ = new BehaviorSubject<string[]>([]);
  // private messages: string[] = [];

  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();
  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
  
  // get allMessages(){
  //   return [...this.messages];
  // }

  // addMessage(message: string) {
  //   this.messages = [...this.messages, message];
  //   this.messages$.next([...this.messages]); // emmiting value, since there is no signals and message-list.ts won't work since it onPush
  // }

//   private messages = signal<string[]>([]);
//   allMessages = this.messages.asReadonly();

 
}