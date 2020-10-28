import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { APIRoutingModule } from './api-router';

import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { ApiComponent } from './api.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { DashNavIconsComponent } from './components/dash-nav-icons/dash-nav-icons.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    APIRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ApiComponent,
    HeaderComponent,
    DashNavComponent,
    DashNavIconsComponent,
  ]

})
export class ApiModule { }
