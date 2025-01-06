import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: `./expense-pie-chart.component.html`,
  styleUrl: `expense-pie-chart.component.css`
})
export class ExpensePieChartComponent implements OnInit, AfterViewInit {
  expenses$ = signal<Expense[]>([]);
  expenseList: ExpenseListComponent;

  constructor(private expenseService: ExpenseService) { }

  public pieChartLabels = [];
  public pieChartDatasets = [{
    data: [300, 500, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FFC107'],
  }];

  ngOnInit() {
    this.getExpenses();
  }

  ngAfterViewInit() {
    this.generateChartData();
  }

  public getExpenses() {
    this.expenseService.getExpensesObservable().subscribe(expenses => {
      this.expenses$.set(expenses);
      this.generateChartData();
    });
  }

  private generateChartData() {
    const categoryTotals: { [key: string]: number } = {};

    // Aggregate amounts by category
    this.expenses$().forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    // Populate chart data
    this.pieChartLabels = Object.keys(categoryTotals);
    this.pieChartDatasets[0].data = Object.values(categoryTotals);
  }
}
