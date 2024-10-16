import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    console.log('CONSTRUCTOR');
  }

  ngOnInit() { // runs after constructor here we already have fields and services initialized
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) { // runs after something is changed(we change text), simple chages param is added automaticly it shows prev and current values
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngDoCheck() { // anything changes on page this will be executed don't use often since it executes a lot
    console.log('ngDoCheck');
  }

  ngAfterContentInit() { // content is about <ng-content> in html it's simmular to onInit
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() { // content is about <ng-content> in html
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() { // view is about html
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() { // always runs right before component dissapears/destroyed even in case some if() statement changes 
    console.log('ngOnDestroy');
  }
}
