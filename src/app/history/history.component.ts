import { Component, OnInit } from '@angular/core';
import { ExpenseTrackerService } from '../_services/expensetracker.service';
import { ExpenseEntry } from '../_models/expense'; // Adjust the path as necessary

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  expenseEntries: ExpenseEntry[] = [];

  constructor(private expenseTrackerService: ExpenseTrackerService) {}

  ngOnInit() {
    this.expenseTrackerService.expenseEntries$.subscribe(entries => {
      this.expenseEntries = entries;
    });
  }
}