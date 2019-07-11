import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guard/auth.guard';

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
  MatDatepickerModule, MatChipsModule, MatButtonToggleModule, MatMenuModule, MatAutocompleteModule, MatFormFieldModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { DataTableComponent } from './template/data-table/data-table.component';

import { NaviComponent } from './components/navi/navi.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ForgetpassComponent } from './components/users/forgetpass/forgetpass.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';

import { HomeComponent } from './pages/home/home.component';
import { BasketComponent } from './pages/basket/basket.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProductsComponent } from './pages/products/products.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    DataTableComponent,
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthBarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD37sTWDS64-IteZwC4YsPv9e_ZpRpHXjs'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DatastoreService, AuthGuard, HandleErrorsService,
    { // Adding Interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorHandlerComponent, ModalWindowComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // NO_ERRORS_SCHEMA,
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  console.log("translate loader running..");
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}