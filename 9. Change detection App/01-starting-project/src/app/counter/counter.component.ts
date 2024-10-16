import { ChangeDetectionStrategy, Component, NgZone, OnInit, inject, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit{

  private zone = inject(NgZone); // I already switched off zone so this is useless
  count = signal(0);

  ngOnInit(): void {
    setTimeout(() => { 
      this.count.set(0);
    }, 4000);


    this.zone.runOutsideAngular(() => {// can be helpful, but only sometimes (called avoiding zone polution)
      setTimeout(() => { // that's a change and components will be reevalueted, in dev mode twice, but I know that won't affect ui, so I wrap it with zone.runOutsideAngular not to trigger update
        console.log('Timer expired!');
        
      }, 5000);
    });

  }


  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
