import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from '../google-chart/google-chart.component';
import { debug } from 'util';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})
export class TableChartComponent implements OnInit {

  public table_ChartData;
  public table_ChartOptions;

  private default_table_ChartData = {
    columns: [
      { type: 'string', name: 'Name' },
      { type: 'number', name: 'Salary' },
      { type: 'boolean', name: 'Full Time Employee' },
    ],
    rows: [
      ['Mike',  {v: 10000, f: '$10,000'}, true],
      ['Jim',   {v: 8000,  f: '$8,000'},  false],
      ['Alice', {v: 12500, f: '$12,500'}, true],
      ['Bob',   {v: 7000,  f: '$7,000'},  true]
    ]
  }

  private default_table_ChartOptions = {
    title: 'Motivation and Energy Level Throughout the Day',
    width: 500,
    height: 200,
    showRowNumber: true,
    tooltip: {trigger: 'selection'},
  };

  constructor() { }

  ngOnInit(): void {
    this.table_ChartData = this.default_table_ChartData; // Default values
    this.table_ChartOptions = this.default_table_ChartOptions; // Default values
  }

}
