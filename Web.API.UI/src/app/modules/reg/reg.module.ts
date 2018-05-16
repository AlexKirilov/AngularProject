import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegRoutingModule } from './reg-routing.module';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../../guard/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { UsersService } from './services/users.service';
import { NewUserService } from './services/new-user.service';

import { RegistrationComponent } from './registration.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    PasswordStrengthBarModule,
    RegRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    SignInComponent,
  ],
  providers: [AuthGuard, DatastoreService, DatashareService, UsersService, NewUserService, HandleErrorsService],
  bootstrap: [RegistrationComponent]
})
export class RegModule { }
