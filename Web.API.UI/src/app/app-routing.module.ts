import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegModule } from './modules/reg/reg.module';
import { AuthGuard } from './guard/auth.guard';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,  },
  { path: '**', redirectTo: '/dashboard' } // component: NotFoundComponent }
];

@NgModule({
  imports: [RegModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
