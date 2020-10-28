import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

// Components
import { PaginatorComponent } from './templates/paginator/paginator.component';
import { PieChartComponent } from './google-charts/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './google-charts/charts/bar-chart/bar-chart.component';
import { GraphNavComponent } from './google-charts/charts/graph-nav/graph-nav.component';
import { LineChartComponent } from './google-charts/charts/line-chart/line-chart.component';
import { ComboChartComponent } from './google-charts/charts/combo-chart/combo-chart.component';
import { TableChartComponent } from './google-charts/charts/table-chart/table-chart.component';
import { GoogleChartComponent } from './google-charts/charts/google-chart/google-chart.component';
import { DataTableTemplateComponent } from './templates/data-table-template/data-table-template.component';
import { GoogleChartTemplateComponent } from './google-charts/google-chart.component';
import { MessageHandlerComponent } from './message-handler/message-handler.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    ComboChartComponent,
    GraphNavComponent,
    TableChartComponent,
    PaginatorComponent,
    MessageHandlerComponent
  ],
  exports: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    ComboChartComponent,
    GraphNavComponent,
    TableChartComponent,
    PaginatorComponent,
    MessageHandlerComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [MessageHandlerComponent]
})
export class SharedModule { }
