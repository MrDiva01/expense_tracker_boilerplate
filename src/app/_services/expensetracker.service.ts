import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpenseEntry, IncomeEntry } from '../_models/expense';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/expensetracker`;

@Injectable({
  providedIn: 'root'
})
export class ExpenseTrackerService {
  private apiUrl = baseUrl; // Using environment variable for the base URL

  private expenseEntriesSource = new BehaviorSubject<ExpenseEntry[]>([]);
  expenseEntries$ = this.expenseEntriesSource.asObservable();

  private incomeEntriesSource = new BehaviorSubject<IncomeEntry[]>([]);
  incomeEntries$ = this.incomeEntriesSource.asObservable();
  
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<ExpenseEntry[]> {
    return this.http.get<ExpenseEntry[]>(`${this.apiUrl}/expenses`).pipe(
      tap(data => this.expenseEntriesSource.next(data)), // Update local cache
      catchError(this.handleError<ExpenseEntry[]>('getExpenses', []))
    );
  }

  addExpense(expense: ExpenseEntry): Observable<ExpenseEntry> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ExpenseEntry>(`${this.apiUrl}/expenses`, expense, { headers }).pipe(
      tap(newExpense => {
        const currentEntries = this.expenseEntriesSource.value;
        this.expenseEntriesSource.next([...currentEntries, newExpense]);
      }),
      catchError(this.handleError<ExpenseEntry>('addExpense'))
    );
  }

  getIncomes(): Observable<IncomeEntry[]> {
    return this.http.get<IncomeEntry[]>(`${this.apiUrl}/incomes`).pipe(
      tap(data => this.incomeEntriesSource.next(data)),
      catchError(this.handleError<IncomeEntry[]>('getIncomes', []))
    );
  }

  addIncome(income: IncomeEntry): Observable<IncomeEntry> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IncomeEntry>(`${this.apiUrl}/incomes`, income, { headers }).pipe(
      tap(newIncome => {
        const currentEntries = this.incomeEntriesSource.value;
        this.incomeEntriesSource.next([...currentEntries, newIncome]);
      }),
      catchError(this.handleError<IncomeEntry>('addIncome'))
    );
  }

  savePlan(
    summary: { month: string; initialBudget: number; totalIncome: number; totalExpenses: number; totalSavings: number },
    expenseEntries: ExpenseEntry[],
    incomeEntries: IncomeEntry[]
  ): Observable<{ summary: any; expenseEntries: ExpenseEntry[]; incomeEntries: IncomeEntry[] }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { summary, expenseEntries, incomeEntries };
    return this.http.post<{ summary: any; expenseEntries: ExpenseEntry[]; incomeEntries: IncomeEntry[] }>(
      `${this.apiUrl}/save-plan`,
      body,
      { headers }
    ).pipe(
      catchError(this.handleError<any>('savePlan'))
    );
  }

  updateLocalIncomeEntries(entries: IncomeEntry[]) {
    this.incomeEntriesSource.next(entries);
  }

  updateLocalExpenseEntries(entries: ExpenseEntry[]) {
    this.expenseEntriesSource.next(entries);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
