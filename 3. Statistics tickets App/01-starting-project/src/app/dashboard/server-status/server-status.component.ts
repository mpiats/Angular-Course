import { Component, DestroyRef, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit{ // , OnDestroy lifecycle https://angular.dev/guide/components/lifecycle
  //currentStatus: 'online' | 'offline' | 'unknown' = 'offline';// kinda of enum
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline'); // the same via signal
  //private interval?: ReturnType<typeof setInterval>; // for onDestroy
  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(() => {
      console.log(this.currentStatus()); // runs code when signal value change, also onCleanup can be defined here (kinda Destructor)
    });
    console.log(this.currentStatus()); // subscribtion is not set up for signal but we can use effect()
  }

  ngOnInit(){
    console.log('On Init');
    // in constructor also will work, but runs after
    const interval = setInterval(() => {
      const rnd = Math.random();
      this.currentStatus.set((rnd < 0.9) ? (rnd < 0.5 ? 'online' : 'offline') : 'unknown');
    }, 5000);

    this.destroyRef.onDestroy(() =>{ // to clar memory on variable in case component will be hidden/removed
      clearInterval(interval);
    });
  }

  ngAfterViewInit(){
    console.log('After view init')
  }

  // ngOnDestroy(): void { kinda old approach
  //   clearTimeout(this.interval);
  // }
}
