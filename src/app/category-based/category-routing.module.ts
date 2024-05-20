import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryBasedComponent } from './category-based.component';

const routes: Routes = [
    { path: '', component: CategoryBasedComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }