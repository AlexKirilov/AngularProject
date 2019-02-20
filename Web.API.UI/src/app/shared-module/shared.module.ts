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
  ],
  declarations: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  exports: [
    DataTableTemplateComponent,
    GoogleChartTemplateComponent,
    GoogleChartComponent,
    PieChartComponent,
    BarChartComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
