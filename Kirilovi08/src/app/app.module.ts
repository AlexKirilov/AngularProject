import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  MatDatepickerModule, MatChipsModule, MatButtonToggleModule, MatMenuModule, MatAutocompleteModule, MatFormFieldModule ,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { AccountComponent } from './components/account/account.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { BasketComponent } from './components/basket/basket.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { DataTableComponent } from './template/data-table/data-table.component';

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
    ForgetpassComponent,
    AccountComponent,
    PurchaseComponent,
    ModalWindowComponent,
    ErrorHandlerComponent,
    BasketComponent,
    SettingsComponent,
    PurchaseHistoryComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
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
  bootstrap: [AppComponent],
  entryComponents: [ErrorHandlerComponent, ModalWindowComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA], // NO_ERRORS_SCHEMA,
})
export class AppModule { }
