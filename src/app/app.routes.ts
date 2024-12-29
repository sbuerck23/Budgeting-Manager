import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

export const routes: Routes = [
    { path: '', component: ExpenseListComponent, title: 'Budget Home' },
    { path: 'new', component: AddExpenseComponent, title: 'New Expense' },
    { path: 'edit/:id', component: EditExpenseComponent, title: 'Edit Expense' },
];