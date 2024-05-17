import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { CategoryBasedComponent } from './category-based.component';

@NgModule({
  declarations: [CategoryBasedComponent],
  imports: [
    CommonModule,
    FormsModule // Add the FormsModule to the imports array
  ]
})
export class CategoryBasedModule { }