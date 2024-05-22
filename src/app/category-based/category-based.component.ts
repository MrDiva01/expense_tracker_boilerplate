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
  categorizedExpenses: any[] = [];

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

    this.loadAllCategories();
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
          this.loadAllCategories();
          this.loading = false;
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteExpense(id: string, category: string) {
    this.categoryService.delete(id, category)
      .pipe(first())
      .subscribe(() => {
        this.loadAllCategories();
      });
  }

  private loadAllCategories() {
    this.categoryService.getAll()
      .pipe(first())
      .subscribe(categories => this.categorizedExpenses = categories);
  }
}
