import { NgModule } from '@angular/core';
import { AuthGuard } from '../../guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { SiteDashboardComponent } from './components/site-dashboard/site-dashboard.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SiteEmployeesComponent } from './components/site-employees/site-employees.component';
import { SiteInvoicesComponent } from './components/site-invoices/site-invoices.component';
import { SiteInvoiceDetailsComponent } from './components/site-invoice-details/site-invoice-details.component';
import { SiteApiConnectionDataComponent } from './components/site-api-connection-data/site-api-connection-data.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'site', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: SiteDashboardComponent },
    { path: 'details',  component: SiteDetailsComponent },
    { path: 'employees', component: SiteEmployeesComponent },
    { path: 'invoices', component: SiteInvoicesComponent },
    { path: 'invoice-details', component: SiteInvoiceDetailsComponent },
    { path: 'api-connection-details', component: SiteApiConnectionDataComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
