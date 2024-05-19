import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseEntry } from './expensetracker.component';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTrackerService {
  private expenseEntriesSource = new BehaviorSubject<ExpenseEntry[]>([]);
  expenseEntries$ = this.expenseEntriesSource.asObservable();

  updateExpenseEntries(entries: ExpenseEntry[]) {
    this.expenseEntriesSource.next(entries);
  }
}