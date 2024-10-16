import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, HostListener, ViewEncapsulation, afterNextRender, afterRender, contentChild, inject, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,// in html of component I have class="control", so css styles are applied,
  // but since there is ng-content, styles .control input, .control textarea will not be applied however they lay inside '<p class = 'component'> (because they are passed there)
  // to make them apply to everything that passes inside we need encapsulation param 
  host: {
    class: 'control', // adds class = "control" to <app-control> also can do with @HostBinding
    '(click)': 'onClick()' // or HostListener
  }
})
export class ControlComponent implements AfterContentInit {
  //@HostBinding('class') className = 'control'; not preferable
  //@HostListener('click') onClick(){}

  label = input.required<string>();
  private el = inject(ElementRef); // el will provide access to host via ts, so you can change it
  //@ContentChild('input') private control?: ElementRef<HTMLInputElement| HTMLTextAreaElement>; // to take from <ng-content>
  private control = contentChild<ElementRef<HTMLInputElement| HTMLTextAreaElement>>('input');// the same but with signals

  constructor() {
    afterRender(() => console.log('afterRender')); // runs whenever any change happens on the page
    afterNextRender(() => console.log('afterNextRender')); // runs for the next change
  }

  ngAfterContentInit(){

  }

  onClick(){
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control);
  }
}
