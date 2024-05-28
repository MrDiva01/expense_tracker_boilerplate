import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { MatTableModule } from '@angular/material/table';
import { ExpenseTrackerComponent } from './expensetracker.component';

@NgModule({
  declarations: [ExpenseTrackerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule // Add the FormsModule to the imports array
  ]
  
})
export class ExpensetrackerModule { }