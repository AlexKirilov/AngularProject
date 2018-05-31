import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guard/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'registrationdetails', component: RegistrationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegRoutingModule { }
