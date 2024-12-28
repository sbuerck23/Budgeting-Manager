import { Component, computed } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CurrencyFormatPipe } from '../currency-format.pipe';

@Component({
  selector: 'app-expense-totals',
  imports: [MatTableModule, MatCardModule, CurrencyFormatPipe],
  templateUrl: `./expense-totals.component.html`,
  styleUrl: `./expense-totals.component.css`
})
export class ExpenseTotalsComponent {

  constructor(private expenseService: ExpenseService) { }

  totalAmount = computed(() => {
    const expenses = this.expenseService.getExpenses();
    return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  });


}
