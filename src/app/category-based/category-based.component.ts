import { Component } from '@angular/core';

@Component({
  selector: 'app-category-based',
  templateUrl: './category-based.component.html'
})
export class CategoryBasedComponent {
  newExpense = { description: '', amount: 0, date: '' }; // Initialize newExpense object with date
  selectedCategory = 'foods'; // Initialize selectedCategory with a default value

  foods: any[] = []; // Array to hold food expenses
  bills: any[] = []; // Array to hold bill expenses
  savings: any[] = []; // Array to hold saving expenses

  addExpense() {
    const expense = { description: this.newExpense.description, amount: this.newExpense.amount, date: this.newExpense.date };

    switch(this.selectedCategory) {
      case 'foods':
        this.foods.push(expense);
        break;
      case 'bills':
        this.bills.push(expense);
        break;
      case 'savings':
        this.savings.push(expense);
        break;
    }

    // Reset form fields
    this.newExpense = { description: '', amount: 0, date: '' };
  }

  saveExpenses() {
    // Implementation of saveExpenses method
    // Example: Perform save operation (e.g., send to server, local storage, etc.)
    console.log('Expenses saved');
    console.log('Foods:', this.foods);
    console.log('Bills:', this.bills);
    console.log('Savings:', this.savings);
  }
}