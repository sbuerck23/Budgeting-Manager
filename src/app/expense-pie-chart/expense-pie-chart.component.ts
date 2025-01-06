import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-expense-pie-chart',
  imports: [BaseChartDirective,],
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
    backgroundColor: ['#90A4AE', '#FFCC80', '#B0BEC5', '#FFE082', '#CFD8DC'],
  }];
  public pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show legend
      },
      datalabels: {
        color: '#000', // Label text color
        formatter: (value: number, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}`; // Format the label
        },
        offset: (context: any) => {
          const value = context.raw; // Get the data value for this slice
          return value > 1000 ? 20 : 10; // Adjust offset based on value
        },
      },
    },
  };

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
