import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
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
      category: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required]],
      date: ['', Validators.required],
    });

    effect(() => {
      this.expenseForm.setValue({
        category: this.initialState()?.category || '',
        amount: this.initialState()?.amount || '',
        date: this.initialState()?.date || '',
      });
    });
  }

  get category() {
    return this.expenseForm.get('category')!;
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