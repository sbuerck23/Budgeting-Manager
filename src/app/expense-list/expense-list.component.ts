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
import { ExpensePieChartComponent } from '../expense-pie-chart/expense-pie-chart.component';

@Component({
  selector: 'app-expense-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, ExpenseTotalsComponent, ExpenseFilterComponent, CurrencyFormatPipe, AsyncPipe, ExpensePieChartComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: `./expense-list.component.css`
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];
  filteredExpenses$!: Observable<Expense[]>;

  constructor(private expensesService: ExpenseService) { }

  ngOnInit() {
    //this.expensesService.filterSubject.next({ searchTerm: '', category: '' });
    this.filteredExpenses$ = this.expensesService.getFilteredExpenses();
  }

  applyFilters(filters: { searchTerm: string; category: string }) {
    this.expensesService.setFilters(filters);
  }
}

