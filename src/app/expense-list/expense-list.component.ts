import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExpenseTotalsComponent } from "../expense-totals/expense-totals.component";
import { ExpenseFilterComponent } from "../expense-filter/expense-filter.component";
import { CurrencyFormatPipe } from '../currency-format.pipe';

@Component({
  selector: 'app-expense-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, ExpenseTotalsComponent, ExpenseFilterComponent, CurrencyFormatPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: `./expense-list.component.css`
})
export class ExpenseListComponent implements OnInit {
  expenses$ = {} as WritableSignal<Expense[]>;
  filteredExpenses$ = signal<Expense[]>([]);
  expensesVar: Expense[] = [];
  displayedColumns: string[] = [
    'col-category',
    'col-description',
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
    this.expensesVar = this.expensesService.getExpenses();
    this.filteredExpenses$ = this.expensesService.expenses$;
  }

  applyFilters(filters: { searchTerm: string; category: string }): void {
    const expenses = this.expenses$();
    const { searchTerm, category } = filters;

    const filtered = expenses.filter(expense => {
      const matchesSearch =
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.amount.toString().includes(searchTerm) ||
        expense.date.includes(searchTerm);

      const matchesCategory = !category || expense.category === category;

      return matchesSearch && matchesCategory;
    });

    this.filteredExpenses$.set(filtered); // Update the filteredExpenses$ signal
  }
}

