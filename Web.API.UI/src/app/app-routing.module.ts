import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { SinglePageComponent } from './components/single-page/single-page.component';
import { RegistrationDetailsComponent } from './auth/registration-details/registration-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SiteDashboardComponent } from './pages/site-dashboard/site-dashboard.component';
import { SiteDetailsComponent } from './pages/site-details/site-details.component';
import { SiteCustomersComponent } from './pages/site-customers/site-customers.component';
import { SiteEmployeesComponent } from './pages/site-employees/site-employees.component';
import { SiteOrdersComponent } from './pages/site-orders/site-orders.component';
import { SiteInvoicesComponent } from './pages/site-invoices/site-invoices.component';
import { SiteApiConnectionDataComponent } from './pages/site-api-connection-data/site-api-connection-data.component';
import { SiteLogsComponent } from './pages/site-logs/site-logs.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'registrationdetails', canActivate: [AuthGuard], component: RegistrationDetailsComponent },
  { path: 'home', component: SinglePageComponent },

  { path: 'dashboard', canActivate: [AuthGuard], component: SiteDashboardComponent },
  { path: 'details', canActivate: [AuthGuard],  component: SiteDetailsComponent },
  { path: 'customers', canActivate: [AuthGuard], component: SiteCustomersComponent },
  { path: 'employees', canActivate: [AuthGuard], component: SiteEmployeesComponent },
  { path: 'orders', canActivate: [AuthGuard], component: SiteOrdersComponent },
  { path: 'invoices', canActivate: [AuthGuard], component: SiteInvoicesComponent },
  { path: 'api-connection-details', canActivate: [AuthGuard], component: SiteApiConnectionDataComponent },
  { path: 'site-logs', canActivate: [AuthGuard], component: SiteLogsComponent  },

  { path: '**', redirectTo: '/dashboard' } // component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
