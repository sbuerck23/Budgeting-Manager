import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url = 'http://localhost:5200';
  expenses$ = signal<Expense[]>([]);
  expense$ = signal<Expense>({} as Expense);

  private filterSubject = new BehaviorSubject<{ searchTerm: string; category: string }>({ searchTerm: '', category: '' });

  constructor(private httpClient: HttpClient) { }

  private refreshExpenses() {
    this.httpClient.get<Expense[]>(`${this.url}/expenses`)
      .subscribe(expenses => {
        this.expenses$.set(expenses);
      });
  }

  getFilteredExpenses(): Observable<Expense[]> {
    return combineLatest([
      this.httpClient.get<Expense[]>(`${this.url}/expenses`),
      this.filterSubject.asObservable()
    ]).pipe(
      map(([expenses, filters]) => {
        return expenses.filter(expense => {
          const matchesSearch =
            expense.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            expense.amount.toString().includes(filters.searchTerm.toLowerCase()) ||
            expense.date.toLowerCase().includes(filters.searchTerm.toLowerCase());
          const matchesCategory = !filters.category || expense.category === filters.category;
          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  setFilters(filters: { searchTerm: string; category: string }) {
    this.filterSubject.next(filters);
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

  getExpenseById(id: string): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.url}/expenses/${id}`);
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