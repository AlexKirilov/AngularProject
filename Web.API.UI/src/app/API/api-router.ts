import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ApiComponent } from './api.component';


const routes: Routes = [

    { path: '', component: ApiComponent, canActivate: [AuthGuard], children: [
        { path: '', pathMatch: 'full', redirectTo: 'auth' },
        { path: 'orders',  loadChildren: () => import('./pages/site-orders/site-orders.module').then((m) => m.SiteOrdersModule) },
        { path: 'details', loadChildren: () => import('./pages/site-details/details.module').then((m) => m.DetailsModule) },
        { path: 'invoices', loadChildren: () => import('./pages/site-invoices/invoices.module').then((m) => m.InvoicesModule) },
        { path: 'site-logs', loadChildren: () => import('./pages/site-logs/site-logs.module').then((m) => m.SiteLogsModule) },
        { path: 'dashboard', loadChildren: () => import('./pages/site-dashboard/dashboard.module').then((m) => m.DashboardModule) },
        { path: 'employees', loadChildren: () => import('./pages/site-employees/employees.module').then((m) => m.EmployeesModule) },
        { path: 'customers', loadChildren: () => import('./pages/site-customers/customers.module').then((m) => m.CustomersModule) },
        { path: 'api-con-data', loadChildren: () => import('./pages/site-api-con/site-api-con.module').then((m) => m.SiteApiConModule) },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APIRoutingModule { }
