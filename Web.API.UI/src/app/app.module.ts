import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { DatastoreService } from './services/datastore.service';
import { DatashareService } from './services/datashare.service';
import { HandleErrorsService } from './services/handle-errors.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageHandlerComponent } from './components/message-handler/message-handler.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { ApiDataComponent } from './components/api-data/api-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ApiDataComponent,
    NotFoundComponent,
    NavMenuComponent,
    DashboardComponent,
    SinglePageComponent,
    MessageHandlerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
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
  providers: [
    AuthGuard,
    DatastoreService,
    DatashareService,
    HandleErrorsService,
    { // Adding Interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
