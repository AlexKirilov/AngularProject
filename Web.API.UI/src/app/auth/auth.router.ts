
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

import { AuthComponent } from './auth.component';


const routes: Routes = [
    { path: '', component: AuthComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
        { path: 'signup', loadChildren: () =>  import('./signUp/signUp.module').then((m) => m.SignUpModule)},
        { path: 'forgotpassword', loadChildren: () => import('./forgotpass/forgotpass.module').then((m) => m.ForgotpassModule) },
        { path: 'resetpassword', loadChildren: () => import('./resetpass/resetpass.module').then((m) => m.ResetpassModule) },
        { path: 'registrationdetails', canActivate: [AuthGuard], loadChildren: () => import('./registration-details/registration-details.module').then((m) => m.RegistrationDetailsModule) },
    ] },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }