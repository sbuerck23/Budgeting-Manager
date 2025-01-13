import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: ExpenseListComponent, title: 'Budget Home' },
    { path: 'new', component: AddExpenseComponent, title: 'New Expense' },
    { path: 'edit/:id', component: EditExpenseComponent, title: 'Edit Expense' },
    { path: 'expense/:id', component: ViewExpenseComponent, title: 'View Expense' },
    { path: 'login', component: LoginComponent, title: 'Login' }
];