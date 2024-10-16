import { CurrencyPipe } from '@angular/common';
import { Component, Input, computed, inject, input, signal } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // @Input() results?: { // usual approach
  //   year: number,
  //   interest: number,
  //   valueEndOfYear: number,
  //   annualInvestment: number,
  //   totalInterest: number,
  //   totalAmountInvested: number,
  // }[];

  // results = input<{ // signal without service
  //   year: number,
  //   interest: number,
  //   valueEndOfYear: number,
  //   annualInvestment: number,
  //   totalInterest: number,
  //   totalAmountInvested: number,
  // }[]>();

  private investmentService = inject(InvestmentService);

  // get results(){
  //   return this.investmentService.resultsData;
  // }

  results = computed(() => this.investmentService.resultsData()); // or results = this.investmentService.resultsData.asReadOnly();

}
