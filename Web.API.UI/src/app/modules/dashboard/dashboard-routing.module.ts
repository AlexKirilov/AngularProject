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

const routes: Routes = [
  { path: 'site', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: SiteDashboardComponent },
    { path: 'details',  component: SiteDetailsComponent },
    { path: 'customers', component: SiteCustomersComponent },
    { path: 'employees', component: SiteEmployeesComponent },
    { path: 'invoices', component: SiteInvoicesComponent },
    { path: 'api-connection-details', component: SiteApiConnectionDataComponent },
    { path: 'site-logs', component: SiteLogsComponent  }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
