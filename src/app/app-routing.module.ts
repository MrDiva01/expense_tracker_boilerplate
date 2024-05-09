import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ExpenseTrackerComponent } from './expensetracker';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const ExpensetrackerModule = () => import('./expensetracker/expensetracker.module').then(x => x.ExpensetrackerModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'expensetracker', component: ExpenseTrackerComponent, canActivate: [AuthGuard] }, // New route for ExpenseTrackerComponent

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