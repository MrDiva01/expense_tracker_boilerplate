import { Component } from '@angular/core';

@Component({
  selector: 'app-expensetracker',
  templateUrl: './expensetracker.component.html'
})
export class ExpenseTrackerComponent {
  newExpense = { description: '', amount: 0 }; // Initialize newExpense object

  expenses: any[] = []; // Assuming expenses is an array of objects

  addExpense() {
    // Implementation of addExpense method
    // Example: Push new expense object to expenses array
    this.expenses.push({ description: this.newExpense.description, amount: this.newExpense.amount });
    // Reset form fields
    this.newExpense = { description: '', amount: 0 };
  }
}