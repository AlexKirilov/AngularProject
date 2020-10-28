import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ILineSettings } from '../../google-charts.models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() line_ChartData: any;
  @Input() settings: ILineSettings;
  @Input() elementID: string;
  
  public line_ChartOptions: any;
  public isSettings = false;
  public settingsFields: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.line_ChartData = default_line_ChartData; // Default values
    this.line_ChartOptions = this.default_line_ChartOptions(); // Default values
    this.settingsFields = fb.group({
      'width': '',
      'height': '',
      'titlePosition': '',
      'legendAlign': '',
      'legendPos': '',
    });

  }

  ngOnInit(): void { }

  default_line_ChartOptions(
    title = 'Motivation and Energy Level Throughout the Day',
    titlePosition: 'in' | 'out' | 'none' = 'in',
    legend: Object = {
      alignment: 'start',
      position: 'in',
    },
    width: number = 1000,
    height = 600,
    selectionMode: 'single' | 'multiple' = 'single',
    annotations: Object = {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        color: '#000',
        auraColor: 'none'
      }
    },
    tooltip: Object = {
      trigger: 'none',
    },
    hAxis: Object = {
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
    vAxis: Object = {
      title: 'Rating (scale of 1-10)',
      viewWindow: {
        min: 0,
        max: 1
      },
    },
    reverseCategories = true,
    pointShape: 'circle' | 'triangle' | 'square' | 'diamond' | 'star' | 'polygon' = 'circle',
    pointSize = 20,
    pointsVisible = true,
    orientation: 'vertical' | 'horizontal' = 'horizontal'
  ) {
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
      title,
      titlePosition,
      legend,
      width,
      height,
      selectionMode,
      annotations,
      tooltip,
      aggregationTarget: 'category',
      hAxis,
      vAxis,
      reverseCategories,
      pointShape,
      pointSize,
      pointsVisible,
      orientation
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.line_ChartData) {
      this.line_ChartData = default_line_ChartData; // Default values
    }
    if (!this.settings) {
      this.line_ChartOptions = this.default_line_ChartOptions(); // Default values
    } else {
      this.line_ChartOptions = this.default_line_ChartOptions(
        this.settings.title,
        this.settings.titlePosition,
        this.settings.legend,
        this.settings.width,
        this.settings.height,
        this.settings.selectionMode,
        this.settings.annotations,
        this.settings.tooltip,
        this.settings.hAxis,
        this.settings.vAxis,
        this.settings.reverseCategories,
        this.settings.pointShape,
        this.settings.pointSize,
        this.settings.pointsVisible,
        this.settings.orientation
      );
    }
  }
}


const default_line_ChartData = {
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