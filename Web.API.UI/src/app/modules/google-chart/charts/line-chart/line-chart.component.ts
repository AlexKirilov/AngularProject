import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from '../google-chart/google-chart.component';
import { debug } from 'util';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public line_ChartData;
  public line_ChartOptions;

  private default_line_ChartData = {
    columns: [
      { type: 'timeofday', name: 'Time of Day' },
      { type: 'number', name: 'Rating' },
      // { type: 'number', name: 'annotations' },
    ],
    rows: [
      [{ v: [0, 0, 0], f: '12 am' }, .5],
      [{ v: [18, 0, 0], f: '6 pm' }, .6],
      [{ v: [21, 0, 0], f: '9 pm' }, .2],
      [{ v: [24, 0, 0], f: '12 am' }, .5],
      [{ v: [27, 0, 0], f: '3 am' }, .1],
      [{ v: [30, 0, 0], f: '6 am' }, .5],
      [{ v: [33, 0, 0], f: '9 am' }, .9],
    ]
  }

  default_line_ChartOptions() {
    let width = 1000, height = 600;
    if (window.innerWidth < 400) {
      width = 350, height = 300;
    } else if (window.innerWidth < 500) {
      width = 400, height = 350;
    } else if (window.innerWidth < 600) {
      width = 500, height = 400;
    } else if (window.innerWidth < 700) {
      width = 600, height = 450;
    } else if (window.innerWidth < 800) {
      width = 700, height = 500;
    } else if (window.innerWidth < 900) {
      width = 800, height = 550;
    } else if (window.innerWidth < 1000) {
      width = 900
    }
    return {
      title: 'Motivation and Energy Level Throughout the Day',
      legend: 'none',
      width,
      height,
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 14,
          color: '#000',
          auraColor: 'none'
        }
      },
      tooltip: { trigger: 'selection' },
      aggregationTarget: 'category',
      hAxis: {
        title: 'Time of Day',
        format: 'h:mm a',
        viewWindow: {
          min: [17, 0, 0],
          max: [33, 0, 0]
        },
        gridlines: {
          count: 5,
        },
        direction: -1
      },
      vAxis: {
        title: 'Rating (scale of 1-10)',
        viewWindow: {
          min: 0,
          max: 1
        },
      },
      reverseCategories: true,
      pointShape: 'circle',
      pointSize: 20,
      pointsVisible: true,
      // orientation: 'vertical',
    };
  }

  constructor() { }

  ngOnInit(): void {
    this.line_ChartData = this.default_line_ChartData; // Default values
    this.line_ChartOptions = this.default_line_ChartOptions(); // Default values
  }

}
