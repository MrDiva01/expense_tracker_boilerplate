import { Component } from '@angular/core';
import { ExpenseTrackerService } from './expensetracker.service';


// Define the ExpenseEntry interface
export interface ExpenseEntry {
  description: string;
  date: string;
  amount: number;
}

interface IncomeEntry {
  description: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-expensetracker',
  templateUrl: './expensetracker.component.html'
})
export class ExpenseTrackerComponent {
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  selectedMonth: string;
  initialBudget: number;
  budgetSet: boolean = false;
  savedPlans: any[] = []


  newExpense: ExpenseEntry = {
    description: '',
    date: '',
    amount: 0
  };

  newIncome: IncomeEntry = {
    description: '',
    date: '',
    amount: 0
  };

  IncomeEntries: IncomeEntry[] = [];
  expenseEntries: ExpenseEntry[] = [];
  totalAmount: number = 0;

  setBudget() {
    if (this.selectedMonth && this.initialBudget > 0) {
      this.budgetSet = true;
    }
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.date && this.newExpense.amount > 0) {
      this.expenseEntries.push({ ...this.newExpense });
      this.totalAmount += this.newExpense.amount;
      this.resetForm();
    }
  }

  editExpense(index: number) {
    // Retrieve the expense entry based on the index
    const editedExpense = this.expenseEntries[index];
  
    // Assign the values of the edited expense entry to newExpense for editing
    this.newExpense = { ...editedExpense };
  
    // Remove the expense entry from the list
    this.expenseEntries.splice(index, 1);
  }
  
  deleteExpense(index: number) {
    // Remove the expense entry from the list based on the index
    this.expenseEntries.splice(index, 1);
  }
  

  addIncome() {
    if (this.newIncome.description && this.newIncome.date && this.newIncome.amount > 0) {
      this.IncomeEntries.push({ ...this.newIncome });
      this.totalAmount += this.newExpense.amount;
      this.resetForm();
    }
  }

  editIncome(index: number) {
    // Retrieve the income entry based on the index
    const editedIncome = this.IncomeEntries[index];
  
    // Assign the values of the edited income entry to newIncome for editing
    this.newIncome = { ...editedIncome };
  
    // Remove the income entry from the list
    this.IncomeEntries.splice(index, 1);
  }
  
  deleteIncome(index: number) {
    // Remove the income entry from the list based on the index
    this.IncomeEntries.splice(index, 1);
  }
  


  resetForm() {
    this.newExpense = {
      description: '',
      date: '',
      amount: 0
    };

    this.newIncome = {
     description: '',
     date: '',
     amount: 0
    };
  }
  
 

  totalIncome() {
    return this.IncomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
  }

  totalExpenses() {
    return this.expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
  }

  totalSavings() {
    return this.totalIncome() - this.initialBudget - this.totalExpenses();
  }

  constructor(private expenseTrackerService: ExpenseTrackerService) {}

  savePlan() {
    // Create an object representing the current plan
    const planDetails = {
      month: this.selectedMonth,
      initialBudget: this.initialBudget,
      totalIncome: this.totalIncome(),
      totalExpenses: this.totalExpenses(),
      totalSavings: this.totalSavings()
    };

    // Push the current plan details into the array of saved plans
    this.expenseTrackerService.updateExpenseEntries(this.expenseEntries);
  }
  
  createNewPlan() {
    // Reset the form and start a new plan
    this.selectedMonth = '';
    this.initialBudget = 0;
    this.budgetSet = false;
    this.newIncome = { description: '', date: '', amount: 0 };
    this.newExpense = { description: '', date: '', amount: 0 };
    this.IncomeEntries = [];
    this.expenseEntries = [];
    this.totalAmount = 0;
  }
  
}