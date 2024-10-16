import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild, output, viewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css',
    imports: [ControlComponent, ButtonComponent, FormsModule]
})
export class NewTicketComponent implements OnInit, AfterViewInit{
    //@ViewChild('form') form?: ElementRef<HTMLFormElement>; // to find templeate elems or components 
    private form = viewChild.required<ElementRef<HTMLFormElement>>('form'); // via signal
    enteredTitle = '';// did it 2 ways
    enteredText = '';
    add = output<{title: string; text: string}>();

    ngOnInit(){
        console.log('on init');
        console.log(this.form().nativeElement); // can be undefined on this stage, that's why using ngAfterViewInit, btw with signals work both
    }
    ngAfterViewInit(): void {
        console.log('after view init');
        console.log(this.form().nativeElement);
    }

    // onSubmit(title: string, ticketText: string){// titleElement: HTMLInputElement
    //     this.add.emit({title: title, text: ticketText});
    //     //this.form?.nativeElement.reset();
    //     this.form().nativeElement.reset();
    // }

    onSubmit(){// titleElement: HTMLInputElement
        this.add.emit({title: this.enteredTitle, text: this.enteredText});
        //this.form?.nativeElement.reset();
        this.form().nativeElement.reset();
        this.enteredTitle = '';
        this.enteredText = '';
    }
}
