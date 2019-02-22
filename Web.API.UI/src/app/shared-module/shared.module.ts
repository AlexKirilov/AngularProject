import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule,
  MatSidenavModule, MatInputModule, MatTooltipModule, MatToolbarModule,
  MatTabsModule, MatTableModule, MatStepperModule, MatSortModule, MatSnackBarModule,
  MatSlideToggleModule, MatSliderModule, MatSelectModule, MatRippleModule, MatRadioModule,
  MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatNativeDateModule,
  MatListModule, MatGridListModule, MatExpansionModule, MatDividerModule, MatDialogModule,
  MatDatepickerModule, MatChipsModule, MatButtonToggleModule, MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableTemplateComponent } from '../templates/data-table-template/data-table-template.component';
import { GoogleChartTemplateComponent } from '../modules/google-chart/google-chart.component';
import { PieChartComponent } from '../modules/google-chart/charts/pie-chart/pie-chart.component';
import { GoogleChartComponent } from '../modules/google-chart/charts/google-chart/google-chart.component';
import { BarChartComponent } from '../modules/google-chart/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '../modules/google-chart/charts/line-chart/line-chart.component';
import { ComboChartComponent } from '../modules/google-chart/charts/combo-chart/combo-chart.component';
import { GraphNavComponent } from '../modules/google-chart/charts/graph-nav/graph-nav.component';
import { TableChartComponent } from '../modules/google-chart/charts/table-chart/table-chart.component';
import { PaginatorComponent } from '../templates/paginator/paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
  ],
  declarations: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    ComboChartComponent,
    // GraphNavComponent,
    TableChartComponent,
    PaginatorComponent,
  ],
  exports: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    ComboChartComponent,
    // GraphNavComponent,
    TableChartComponent,
    PaginatorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
