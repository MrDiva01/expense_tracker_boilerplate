import { Component } from '@angular/core';

// Define the ExpenseEntry interface
interface ExpenseEntry {
  income: string;
  date: string; // Change to string for simplicity (can be formatted as needed)
  amount: number;
}

@Component({
  selector: 'app-expensetracker',
  templateUrl: './expensetracker.component.html'
})
export class ExpenseTrackerComponent {
  // Available months for selection
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedMonth: string;
  initialBudget: number;
  budgetSet: boolean = false; // Initialize budgetSet property

  newExpense: ExpenseEntry = {
    income: '',
    date: '',
    amount: 0
  };

  expenseEntries: ExpenseEntry[] = [];

  setBudget() {
    // Validate input before setting budget
    if (this.selectedMonth && this.initialBudget > 0) {
      this.budgetSet = true; // Set budgetSet to true if valid input
    }
  }

  addExpense() {
    // Validate and add the new expense entry
    if (this.newExpense.income && this.newExpense.date && this.newExpense.amount > 0) {
      this.expenseEntries.push({ ...this.newExpense }); // Add a copy of newExpense to expenseEntries
      this.resetForm(); // Reset the form after adding the expense
    }
  }

  resetForm() {
    // Reset the newExpense object to clear the form
    this.newExpense = {
      income: '',
      date: '',
      amount: 0
    };
  }
}
