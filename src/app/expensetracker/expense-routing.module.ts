import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseTrackerComponent } from './expensetracker.component';

const routes: Routes = [
    { path: '', component: ExpenseTrackerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseTrackerModule { }