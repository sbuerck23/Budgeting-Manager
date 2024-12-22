import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

export const routes: Routes = [
    { path: '', component: ExpenseListComponent, title: 'Expenses List' },
    { path: 'new', component: AddExpenseComponent },
    { path: 'edit/:id', component: EditExpenseComponent },
];