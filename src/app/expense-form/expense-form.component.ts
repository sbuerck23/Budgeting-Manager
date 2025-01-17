import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Expense } from '../expense';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    RouterModule,
  ],
  styleUrl: `./expense-form.component.css`,
  templateUrl: `./expense-form.component.html`,
})
export class ExpenseFormComponent {
  initialState = input<Expense>();
  expenseForm: FormGroup;

  @Output()
  formValuesChanged = new EventEmitter<Expense>();

  @Output()
  formSubmitted = new EventEmitter<Expense>();



  constructor(private formBuilder: FormBuilder) {
    this.expenseForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      date: ['', Validators.required],
    });

    effect(() => {
      this.expenseForm.setValue({
        category: this.initialState()?.category || '',
        description: this.initialState()?.description || '',
        amount: this.initialState()?.amount || '',
        date: this.initialState()?.date || '',
      });
    });
  }

  get category() {
    return this.expenseForm.get('category')!;
  }
  get description() {
    return this.expenseForm.get('description')!;
  }
  get amount() {
    return this.expenseForm.get('amount')!;
  }
  get date() {
    return this.expenseForm.get('date')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.expenseForm.value as Expense);
  }
}