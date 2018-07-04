import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegModule } from './modules/reg/reg.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { SinglePageComponent } from './components/single-page/single-page.component';
import { LoginComponent } from './modules/reg/components/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: SinglePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' } // component: NotFoundComponent }
];

@NgModule({
  imports: [RegModule, DashboardModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
