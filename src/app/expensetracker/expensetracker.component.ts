import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseTrackerService } from '../_services/expensetracker.service';

// Define the ExpenseEntry interface
export interface ExpenseEntry {
  description: string;
  date: string;
  amount: number;
}

export interface IncomeEntry {
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
  savedPlans: any[] = [];
  
  newExpense: ExpenseEntry = {
    description: '',
    date: '',
    amount: 0,
  };

  newIncome: IncomeEntry = {
    description: '',
    date: '',
    amount: 0,
  };

  IncomeEntries: IncomeEntry[] = [];
  expenseEntries: ExpenseEntry[] = [];

  dataSourceIncome = new MatTableDataSource(this.IncomeEntries);
  dataSourceExpense = new MatTableDataSource(this.expenseEntries);

  totalAmount: number = 0;

  constructor(private expenseTrackerService: ExpenseTrackerService) {}

  setBudget() {
    if (this.selectedMonth && this.initialBudget > 0) {
      this.budgetSet = true;
    }
  }

  addExpense() {
    if (this.newExpense.description && this.newExpense.date && this.newExpense.amount > 0) {
      this.expenseEntries.push({ ...this.newExpense });
      this.totalAmount += this.newExpense.amount;
      this.dataSourceExpense.data = this.expenseEntries;
      this.resetExpenseForm();
    }
  }

  editExpense(index: number) {
    const editedExpense = this.expenseEntries[index];
    this.newExpense = { ...editedExpense };
    this.expenseEntries.splice(index, 1);
    this.dataSourceExpense.data = this.expenseEntries;
  }

  deleteExpense(index: number) {
    this.expenseEntries.splice(index, 1);
    this.dataSourceExpense.data = this.expenseEntries;
  }

  addIncome() {
    if (this.newIncome.description && this.newIncome.date && this.newIncome.amount > 0) {
      this.IncomeEntries.push({ ...this.newIncome });
      this.totalAmount += this.newIncome.amount;
      this.dataSourceIncome.data = this.IncomeEntries;
      this.resetIncomeForm();
    }
  }

  editIncome(index: number) {
    const editedIncome = this.IncomeEntries[index];
    this.newIncome = { ...editedIncome };
    this.IncomeEntries.splice(index, 1);
    this.dataSourceIncome.data = this.IncomeEntries;
  }

  deleteIncome(index: number) {
    this.IncomeEntries.splice(index, 1);
    this.dataSourceIncome.data = this.IncomeEntries;
  }

  resetExpenseForm() {
    this.newExpense = { description: '', date: '', amount: 0 };
  }

  resetIncomeForm() {
    this.newIncome = { description: '', date: '', amount: 0 };
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

  savePlan() {
    const planDetails = {
      month: this.selectedMonth,
      initialBudget: this.initialBudget,
      totalIncome: this.totalIncome(),
      totalExpenses: this.totalExpenses(),
      totalSavings: this.totalSavings()
    };

    this.expenseTrackerService.updateLocalExpenseEntries(this.expenseEntries);
  }

  createNewPlan() {
    this.selectedMonth = '';
    this.initialBudget = 0;
    this.budgetSet = false;
    this.newIncome = {description: '', date: '', amount: 0};
    this.newExpense = {description: '', date: '', amount: 0};
    this.IncomeEntries = [];
    this.expenseEntries = [];
    this.dataSourceIncome.data = this.IncomeEntries;
    this.dataSourceExpense.data = this.expenseEntries;
    this.totalAmount = 0;
  }
}