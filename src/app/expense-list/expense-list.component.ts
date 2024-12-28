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
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, ExpenseTotalsComponent, ExpenseFilterComponent, CurrencyFormatPipe, AsyncPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: `./expense-list.component.css`
})
export class ExpenseListComponent implements OnInit {
  expenses$ = {} as WritableSignal<Expense[]>;
  filteredExpenses$!: Observable<Expense[]>;

  constructor(private expensesService: ExpenseService) { }

  ngOnInit() {
    this.filteredExpenses$ = this.expensesService.getFilteredExpenses();
  }

  deleteExpense(id: string): void {
    this.expensesService.deleteExpense(id).subscribe({
      next: () => this.fetchExpenses(),
    });
  }

  private fetchExpenses(): void {
    this.expensesService.getExpenses();
    this.expenses$ = this.expensesService.expenses$;
  }

  applyFilters(filters: { searchTerm: string; category: string }) {
    this.expensesService.setFilters(filters);
  }
}

