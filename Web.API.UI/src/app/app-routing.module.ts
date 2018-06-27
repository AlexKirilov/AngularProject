import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegModule } from './modules/reg/reg.module';
import { AuthGuard } from './guard/auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { ApiDataComponent } from './components/api-data/api-data.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: SinglePageComponent},
  { path: 'api-data', canActivate: [AuthGuard], component: ApiDataComponent  },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent  },
  { path: '**', redirectTo: '/dashboard' } // component: NotFoundComponent }
];

@NgModule({
  imports: [RegModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
