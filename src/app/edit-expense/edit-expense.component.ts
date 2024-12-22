import { Component, OnInit, WritableSignal } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [ExpenseFormComponent, MatCardModule],
  templateUrl: `./edit-expense.component.html`,
  styleUrl: `./edit-expense.component.css`,
})
export class EditExpenseComponent implements OnInit {
  expense = {} as WritableSignal<Expense>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.expenseService.getExpense(id!);
    this.expense = this.expenseService.expense$;
  }

  editExpense(expense: Expense) {
    this.expenseService
      .updateExpense(this.expense()._id || '', expense)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update expense');
          console.error(error);
        },
      });
  }
}