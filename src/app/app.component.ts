import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExpenseTotalsComponent } from "./expense-totals/expense-totals.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, ExpenseTotalsComponent],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Buerck's Budgeting System</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
      <app-expense-totals></app-expense-totals>
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}