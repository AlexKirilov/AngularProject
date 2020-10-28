import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteApiConComponent } from './site-api-con.component';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { MaterialModule } from '../../../material.module';
import { HighlightModule } from 'ngx-highlightjs';

const routes: Routes = [{ path: '', component: SiteApiConComponent }];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HighlightModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [SiteApiConComponent]
})
export class SiteApiConModule { }
