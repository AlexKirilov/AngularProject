import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guard/auth.guard';
// Add token to header
import { AppAuthInterceptor } from './app.interceptor';

import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule,
  MatSidenavModule, MatInputModule, MatTooltipModule, MatToolbarModule,
  MatTabsModule, MatTableModule, MatStepperModule, MatSortModule, MatSnackBarModule,
  MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule, MatRadioModule,
  MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatNativeDateModule,
  MatListModule, MatGridListModule, MatExpansionModule, MatDividerModule, MatDialogModule,
  MatDatepickerModule, MatChipsModule, MatButtonToggleModule, MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';

import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageHandlerComponent } from './components/message-handler/message-handler.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { SharedModule } from './shared-module/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashNavIconsComponent } from './components/dash-nav-icons/dash-nav-icons.component';
import { ForgotpassComponent } from './auth/forgotpass/forgotpass.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetpassComponent } from './auth/resetpass/resetpass.component';
import { RegistrationDetailsComponent } from './auth/registration-details/registration-details.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { DashNavComponent } from './pages/dash-nav/dash-nav.component';
import { SiteDashboardComponent } from './pages/site-dashboard/site-dashboard.component';
import { SiteApiConnectionDataComponent } from './pages/site-api-connection-data/site-api-connection-data.component';
import { SiteDetailsComponent } from './pages/site-details/site-details.component';
import { SiteInvoicesComponent } from './pages/site-invoices/site-invoices.component';
import { SiteEmployeesComponent } from './pages/site-employees/site-employees.component';
import { SiteLogsComponent } from './pages/site-logs/site-logs.component';
import { SiteCustomersComponent } from './pages/site-customers/site-customers.component';
import { SiteOrdersComponent } from './pages/site-orders/site-orders.component';


export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'javascript', func: javascript},
    {name: 'scss', func: scss}
  ];
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    NotFoundComponent,
    SinglePageComponent,
    MessageHandlerComponent,
    DashNavIconsComponent,

    LoginComponent,
    SignInComponent,
    ResetpassComponent,
    ForgotpassComponent,
    RegistrationDetailsComponent,

    DashNavComponent,
    SiteDashboardComponent,
    SiteApiConnectionDataComponent,
    SiteDetailsComponent,
    SiteInvoicesComponent,
    SiteEmployeesComponent,
    SiteLogsComponent,
    SiteCustomersComponent,
    SiteOrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    PasswordStrengthBarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatNativeDateModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    HighlightModule.forRoot({ languages: hljsLanguages })
  ],
  providers: [
    AuthGuard,
    { // Adding Interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    },
  ],
  entryComponents: [MessageHandlerComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }