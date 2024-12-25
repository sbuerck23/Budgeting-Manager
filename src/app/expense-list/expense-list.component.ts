import { Component, OnInit, WritableSignal } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expense-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './expense-list.component.html',
  styleUrl: `./expense-list.component.css`
})
export class ExpenseListComponent implements OnInit {
  expenses$ = {} as WritableSignal<Expense[]>;
  displayedColumns: string[] = [
    'col-category',
    'col-amount',
    'col-date',
    'col-action',
  ];

  constructor(private expensesService: ExpenseService) { }

  ngOnInit() {
    this.fetchExpenses();
  }

  deleteExpense(id: string): void {
    this.expensesService.deleteExpense(id).subscribe({
      next: () => this.fetchExpenses(),
    });
  }

  private fetchExpenses(): void {
    this.expenses$ = this.expensesService.expenses$;
    this.expensesService.getExpenses();
  }
}
