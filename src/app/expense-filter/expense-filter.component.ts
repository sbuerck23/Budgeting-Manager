import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expense-filter',
  imports: [MatCardModule, FormsModule, CommonModule],
  templateUrl: `./expense-filter.component.html`,
  styleUrl: `./expense-filter.component.css`
})
export class ExpenseFilterComponent {
  @Output() filterChanged = new EventEmitter<{ searchTerm: string; category: string }>();

  searchTerm: string = '';
  selectedCategory: string = '';

  onFilterChange() {
    this.filterChanged.emit({
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
    });
  }
}