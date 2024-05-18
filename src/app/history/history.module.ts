import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { HistoryComponent } from './history.component';

@NgModule({
    declarations: [HistoryComponent],
    imports: [
      CommonModule,
      FormsModule // Add the FormsModule to the imports array
    ]
  })
  export class HistoryModule { }