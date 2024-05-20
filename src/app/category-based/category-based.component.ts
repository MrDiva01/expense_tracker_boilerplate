import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CategoryService, AlertService } from '@app/_services';
import { Category } from '@app/_models';


@Component({
  templateUrl: './category-based.component.html'
})
export class CategoryBasedComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  categories: any = {};
  /*
  foods: any[] = [];
  bills: any[] = [];
  savings: any[] = [];
  otherExpense: any[] = [];*/

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService
) {}

ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.isAddMode = !this.id;

  this.form = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required]
  });

  this.categoryService.getAll()
    .pipe(first())
    .subscribe(categories => this.categories = categories);
}

get f() { return this.form.controls; }

onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.loading = true;
  if (this.isAddMode) {
    this.createCategory();
  }
}

private createCategory() {
  this.categoryService.create(this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.alertService.success('Category created successfully', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    })
}


  /*
  newExpense = { description: '', amount: 0, date: '' }; // Initialize newExpense object with date
  selectedCategory = 'foods'; // Initialize selectedCategory with a default value

  foods: any[] = []; // Array to hold food expenses
  bills: any[] = []; // Array to hold bill expenses
  savings: any[] = []; // Array to hold saving expenses
  otherExpense: any[] = []; // Array to hold saving expenses

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
      case 'otherExpense':
        this.otherExpense.push(expense);
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
    console.log('otherExpense:', this.otherExpense);
  }

  deleteExpense(category: string, index: number) {
    switch(category) {
      case 'foods':
        this.foods.splice(index, 1);
        break;
      case 'bills':
        this.bills.splice(index, 1);
        break;
      case 'savings':
        this.savings.splice(index, 1);
        break;
      case 'otherExpense':
        this.otherExpense.splice(index, 1);
        break;
    }
}

calculateTotal(category: string): number {
    let total = 0;
    switch(category) {
      case 'foods':
        this.foods.forEach(expense => total += expense.amount);
        break;
      case 'bills':
        this.bills.forEach(expense => total += expense.amount);
        break;
      case 'savings':
        this.savings.forEach(expense => total += expense.amount);
        break;
      case 'otherExpense':
        this.otherExpense.forEach(expense => total += expense.amount);
        break;
    }
    return total;
}*/

}