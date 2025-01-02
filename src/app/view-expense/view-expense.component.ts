import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-expense',
  imports: [MatCardModule, CurrencyFormatPipe, RouterLink],
  templateUrl: `./view-expense.component.html`,
  styleUrl: `./view-expense.component.css`
})
export class ViewExpenseComponent implements OnInit {
  public expense: Expense;

  constructor(private expenseService: ExpenseService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expenseService.getExpenseById(id).subscribe(expense => {
        this.expense = expense;
      });
    }
  }

  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.fetchExpenses(),
    });
  }

  private fetchExpenses(): void {
    this.expenseService.getExpenses();
  }

  log(id: string) {
    console.log(id);
  }
}