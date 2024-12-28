import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url = 'http://localhost:5200';
  expenses$ = signal<Expense[]>([]);
  expense$ = signal<Expense>({} as Expense);
  expensesVar: Expense[] = [];

  constructor(private httpClient: HttpClient) { }

  private refreshExpenses() {
    this.httpClient.get<Expense[]>(`${this.url}/expenses`)
      .subscribe(expenses => {
        this.expenses$.set(expenses);
        this.expensesVar = expenses;
      });
  }

  getExpensesVar() {
    this.refreshExpenses();
    return this.expensesVar;
  }

  getExpenses() {
    this.refreshExpenses();
    return this.expenses$();
  }

  getExpense(id: string) {
    this.httpClient.get<Expense>(`${this.url}/expenses/${id}`).subscribe(expense => {
      this.expense$.set(expense);
      return this.expense$();
    });
  }

  createExpense(expense: Expense) {
    return this.httpClient.post(`${this.url}/expenses`, expense, { responseType: 'text' });
  }

  updateExpense(id: string, expense: Expense) {
    return this.httpClient.put(`${this.url}/expenses/${id}`, expense, { responseType: 'text' });
  }

  deleteExpense(id: string) {
    return this.httpClient.delete(`${this.url}/expenses/${id}`, { responseType: 'text' });
  }
}