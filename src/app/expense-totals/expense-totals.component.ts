import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { WritableSignal } from '@angular/core';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense-totals',
  imports: [],
  templateUrl: `./expense-totals.component.html`,
  styleUrl: `./expense-totals.component.css`
})
export class ExpenseTotalsComponent {
  expenses$ = {} as WritableSignal<Expense[]>;


  constructor(private expensesService: ExpenseService) { }

  ngOnInit() {
    this.fetchExpenses();
    console.log(this.expenses$())
  }

  private fetchExpenses(): void {
    this.expenses$ = this.expensesService.expenses$;
    this.expensesService.getExpenses();
  }
}
