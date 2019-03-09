import { NgModule } from '@angular/core';
import { AuthGuard } from '../../guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { SiteDashboardComponent } from './components/site-dashboard/site-dashboard.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteEmployeesComponent } from './components/site-employees/site-employees.component';
import { SiteInvoicesComponent } from './components/site-invoices/site-invoices.component';
import { SiteApiConnectionDataComponent } from './components/site-api-connection-data/site-api-connection-data.component';
import { DashboardComponent } from './dashboard.component';
import { SiteLogsComponent } from './components/site-logs/site-logs.component';
import { SiteCustomersComponent } from './components/site-customers/site-customers.component';
import { SiteOrdersComponent } from './components/site-orders/site-orders.component';

const routes: Routes = [
  { path: 'site', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', canActivate: [AuthGuard], component: SiteDashboardComponent },
    { path: 'details', canActivate: [AuthGuard],  component: SiteDetailsComponent },
    { path: 'customers', canActivate: [AuthGuard], component: SiteCustomersComponent },
    { path: 'employees', canActivate: [AuthGuard], component: SiteEmployeesComponent },
    { path: 'orders', canActivate: [AuthGuard], component: SiteOrdersComponent },
    { path: 'invoices', canActivate: [AuthGuard], component: SiteInvoicesComponent },
    { path: 'api-connection-details', canActivate: [AuthGuard], component: SiteApiConnectionDataComponent },
    { path: 'site-logs', canActivate: [AuthGuard], component: SiteLogsComponent  }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
