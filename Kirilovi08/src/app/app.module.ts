import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guard/auth.guard';
// Add token to header
import { AppAuthInterceptor } from './app.interceptor';

import { DatastoreService } from './services/datastore.service';
import { HandleErrorsService } from './services/handle-errors.service';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule,
  MatSidenavModule, MatInputModule, MatTooltipModule, MatToolbarModule,
  MatTabsModule, MatTableModule, MatStepperModule, MatSortModule, MatSnackBarModule,
  MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule, MatRadioModule,
  MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatNativeDateModule,
  MatListModule, MatGridListModule, MatExpansionModule, MatDividerModule, MatDialogModule,
  MatDatepickerModule, MatChipsModule, MatButtonToggleModule, MatMenuModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProductsComponent } from './components/products/products.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { ForgetpassComponent } from './components/users/forgetpass/forgetpass.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactsComponent,
    ProductsComponent,
    GalleryComponent,
    LoginComponent,
    SigninComponent,
    ForgetpassComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
  ],
  providers: [DatastoreService, AuthGuard, HandleErrorsService,
    { // Adding Interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }