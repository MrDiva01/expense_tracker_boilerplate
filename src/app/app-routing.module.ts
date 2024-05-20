import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ExpenseTrackerComponent } from './expensetracker';
import { HistoryComponent } from './history';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const ExpensetrackerModule = () => import('./expensetracker/expensetracker.module').then(x => x.ExpensetrackerModule);
const categoryModule = () => import('./category-based/category-based.module').then(x => x.CategoryBasedModule);
const HistoryModule = () => import('./history/history.module').then(x => x.HistoryModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'expensetracker', component: ExpenseTrackerComponent, canActivate: [AuthGuard] }, // New route for ExpenseTrackerComponent
    { path: 'category-based', loadChildren: categoryModule, canActivate: [AuthGuard] }, // New route for CategoryBasedComponent
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] }, // New route for HistoryComponent
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes),
    FormsModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }