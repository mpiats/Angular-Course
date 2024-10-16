import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]', // here if I have button or a any in project I can put <button appButton> and the template will be put into it
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {

}
