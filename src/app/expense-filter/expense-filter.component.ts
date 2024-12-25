import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expense-filter',
  imports: [MatCardModule,],
  templateUrl: `./expense-filter.component.html`,
  styleUrl: `./expense-filter.component.css`
})
export class ExpenseFilterComponent {

}
