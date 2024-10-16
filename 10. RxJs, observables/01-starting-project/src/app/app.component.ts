import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSingal = toSignal(this.interval$, {initialValue: 0}); // converted from signal, works fine, but has no initial value from default, here subcription will be cleaned automaticly 

  
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      //subscriber.error();
      if(timesExecuted > 3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emmiting new value...');
      
      subscriber.next({message: 'New value (custom obs)'});
      timesExecuted++;
    }, 2000);
  });
  // via signals
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval()*2);

  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(() => {
      console.log(`Clicked button ${this.clickCount} times.`);
      
    });

    toObservable(this.clickCount);
  }

  ngOnInit(): void {

    //custom observable
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed custom'),
      error: (err) => console.log(err),
      
      
    });

    const subscription = interval(1000).pipe(
      map((val) => val * 2)
    ).subscribe({
      next: (val) => console.log(val),
      // complete:  () => {},
      // error: () => {}
    });

    // setInterval(() => { // via signals
    //   this.interval.update(prev => prev + 1);
    // }, 1000)

    this.clickCount$.subscribe({ // it also listens to signal and workd fine
      next: (val) =>  console.log(`Clicked button ${this.clickCount} times.`),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick(){
    this.clickCount.update(prevCount => prevCount + 1);
  }

}
