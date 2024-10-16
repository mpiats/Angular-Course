import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Subscription, subscribeOn } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent { //implements OnInit

  

  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;
  //messages$ = this.messagesService.messages$;

  //that was manual approach
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // ngOnInit(): void { // here I tell that despite I have OnPush here and in other places need to check messages in service, it is emmited from service
  //   const subsription = this.messagesService.messages$.subscribe((messages) => {
  //    this.messages = messages;
  //    this.cdRef.markForCheck();
  //   });
  //   this.destroyRef.onDestroy(() => {subsription.unsubscribe();})
  //  }

  // messages: string[] = [];

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
