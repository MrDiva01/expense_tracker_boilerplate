import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { ExpenseTrackerComponent } from './expensetracker.component';

@NgModule({
  declarations: [ExpenseTrackerComponent],
  imports: [
    CommonModule,
    FormsModule // Add the FormsModule to the imports array
  ]
})
export class ExpensetrackerModule { }