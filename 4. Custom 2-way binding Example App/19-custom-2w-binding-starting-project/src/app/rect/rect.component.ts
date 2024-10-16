import { Component, EventEmitter, Input, Output, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding

  size = model.required<{width: string, height: string}>(); // makes it 2 way bindable

  onReset() {
    this.size.set({
          width: '200',
          height: '100'
        });
  }

  // @Input({required: true}) size!: {width: string, height: string};
  // @Output() sizeChange = new EventEmitter<{width: string, height: string}>();

  // onReset() {
  //   this.sizeChange.emit({
  //     width: '200',
  //     height: '100'
  //   });

  // }

}
