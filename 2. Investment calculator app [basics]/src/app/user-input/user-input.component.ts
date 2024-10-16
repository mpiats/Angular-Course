import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  //@Output() calculate = new EventEmitter<InvestmentInput>();
  // enteredInitialInvestment = '0';
  // enteredAnnualInvestment = '0';
  // enteredExpectedREturn = '5';
  // enteredDuration = '10';

  // calculate = output<InvestmentInput>(); // via signal without service
  enteredInitialInvestment = signal('22');
  enteredAnnualInvestment = signal('17');
  enteredExpectedREturn = signal('5');
  enteredDuration = signal('10');

  constructor(private investmentService: InvestmentService){

  }

  onSubmit(){
    this.investmentService.calculateInvestmentResults({
        initialInvestment: +this.enteredInitialInvestment(),
        duration: +this.enteredDuration(),
        expectedReturn: +this.enteredExpectedREturn(),
        annualInvestment: +this.enteredAnnualInvestment()
      });
    
    // this.calculate.emit({ // without service
    //   initialInvestment: +this.enteredInitialInvestment(),// regular without brakets
    //   duration: +this.enteredDuration(),
    //   expectedReturn: +this.enteredExpectedREturn(),
    //   annualInvestment: +this.enteredAnnualInvestment()
    // })
    this.enteredAnnualInvestment.set('22');
    this.enteredAnnualInvestment.set('17');
    this.enteredExpectedREturn.set('5');
    this.enteredDuration.set('10');
    console.log("Submitted");
  }
}
