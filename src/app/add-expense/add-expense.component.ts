import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ExpenseFormComponent, MatCardModule],
  templateUrl: `./add-expense.component.html`,
  styleUrl: `./add-expense.component.css`,
})
export class AddExpenseComponent {
  constructor(
    private router: Router,
    private expenseService: ExpenseService
  ) { }

  addExpense(expense: Expense) {
    this.expenseService.createExpense(expense).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create expense' + error);
        console.error(error);
      },
    });
    this.expenseService.getExpenses();
  }
}