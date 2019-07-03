import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IBarSettings } from '../../google-charts.models';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() bar_ChartData: any;
  @Input() bar_ChartSettings: IBarSettings;
  @Input() elementID: string;

  public bar_ChartOptions: any;
  public barGroupWidth: FormGroup;

  public barChartSyle = new FormControl('1', [Validators.required]); // 0, 1, 2, 3, 4
  public isStacked = new FormControl(true, [Validators.required]); // true / false, percent
  public barsType = new FormControl('horizontal', [Validators.required]); //  horizontal or vertical
  public legendTxtAlignment = new FormControl('start', [Validators.required]); // legend.alignment -> start, center, end
  public tooltipIsHtml = new FormControl(false, [Validators.required]); // true / false
  public tooltipTrigger = new FormControl('focus', [Validators.required]);  // focus, selection, none
  public reverse = new FormControl(false, [Validators.required]); // true / false
  public legendPosition = new FormControl('top', [Validators.required]); // legend.position -> top, left, bottom, right, in, none


  constructor(public fb: FormBuilder) {
    this.barGroupWidth = fb.group({
      'width': [75, [Validators.required, Validators.min(20), Validators.max(100)]],
    });
  }

  ngOnInit() {
    this.bar_ChartData = default_bar_ChartData[1]; // Default values and Style
    this.bar_ChartOptions = this.ChartOptionsChange(); // Default values
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.bar_ChartData) {
      this.bar_ChartData = default_bar_ChartData[1]; // Default values and Style
    }
    if (!this.bar_ChartSettings) {
      this.bar_ChartOptions = this.ChartOptionsChange(); // Default values
    } else {
      this.bar_ChartOptions = this.ChartOptionsChange(
        this.bar_ChartSettings.barWidth,
        this.bar_ChartSettings.barsType,
        {
          position: this.bar_ChartSettings.legend.position,
          alignment: this.bar_ChartSettings.legend.alignment
        },
        this.bar_ChartSettings.isStacked,
        {
          isHtml: this.bar_ChartSettings.tooltip.isHtml,
          trigger: this.bar_ChartSettings.tooltip.trigger
        },
        this.bar_ChartSettings.reverse
      );
    }
  }


  changeBarChartStyle() {
    this.bar_ChartData = default_bar_ChartData[this.barChartSyle.value];
  }

  onChartChange() {
    this.bar_ChartOptions = this.ChartOptionsChange(
      this.barGroupWidth.value.width,
      this.barsType.value,
      { position: this.legendPosition.value, alignment: this.legendTxtAlignment.value },
      this.isStacked,
      { isHtml: this.tooltipIsHtml.value, trigger: this.tooltipTrigger.value },
      this.reverse.value
    );
  }
  // For more options see: 'https://developers.google.com/chart/interactive/docs/gallery/piechart'
  ChartOptionsChange(
    bar = 75,
    bars: string = 'vertical', //  horizontal or vertical
    legend: object = {
      position: 'top', // legend.position -> top, left, bottom, right, in, none
      alignment: 'center', // legend.alignment -> start, center, end
      //    legend.textStyle -> { color: <string>,   fontName: <string>,  fontSize: <number>,  bold: <boolean>,  italic: <boolean> }
    },
    isStacked: any = 'true', // true/flase, percent
    // hAxis: any = {}, // { minValue: 0, ticks: [0, .3, .6, .9, 1] },
    // series: object = {
    //   0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
    //   1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
    // },
    // axes: object = {
    //   x: {
    //     distance: { label: 'parsecs' }, // Bottom x-axis.
    //     brightness: { side: 'top', label: 'apparent magnitude' } // Top x-axis.
    //   }
    // },
    tooltip: object = {
      isHtml: false,
      trigger: 'focus' // focus, selection, none
    },
    reverseCategories: boolean = false,
    // trendlines: object = {
    //   0: { type: 'linear', color: 'green', lineWidth: 3, opacity: 0.3, showR2: true, visibleInLegend: true }
    // }
  ) {
    let width = 600, height = 400;

    if (window.innerWidth < 400) {
      width = 300; height = 300;
    } else if (window.innerWidth < 500) {
      width = 350; height = 300;
    } else if (window.innerWidth < 600) {
      width = 450;
    }
    return {
      bar: { groupWidth: bar + '%' },
      // bars,
      // axes,
      // hAxis,
      title: 'Density of Precious Metals, in g/cm^3',
      // chart: { title: 'Company Performance', subtitle: 'Sales, Expenses, and Profit: 2014-2017', },
      width,
      height,
      legend, // Maximum call stack size exceeded
      // series,
      tooltip, // Maximum call stack size exceeded
      // isStacked,
      // trendlines,
      reverseCategories, // Maximum call stack size exceeded
    };
  }
}


const default_bar_ChartData = [
  // role: "style" -> color, opacity, fill-color,
  // fill-opacity, stroke-color, stroke-opacity, stroke-width
  [
    ['Element', 'Density', { role: 'style' }, { role: 'annotation' }],
    ['Copper', 8.94, '#b87333', 8.94],
    ['Silver', 10.49, 'silver', 10.49],
    ['Gold', 19.30, 'gold', 19.30],
    ['Platinum', 21.45, 'color: #e5e4e2', 21.45]
  ],
  [
    ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
      'Western', 'Literature', { role: 'annotation' }],
    ['2010', 10, 24, 20, 32, 18, 5, ''],
    ['2020', 16, 22, 23, 30, 16, 9, ''],
    ['2030', 28, 19, 29, 30, 12, 13, ''],
  ],
  [
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ],
  [
    ['Year', 'Sales', { role: 'annotation' }, 'Expenses', 'Profit', { role: 'annotation' }],
    ['2014', 1000, 1000, 400, 200, 200],
    ['2015', 1170, 1170, 460, 250, 250],
    ['2016', 660, 660, 1120, 300, 300],
    ['2017', 1030, 1030, 540, 350, 350],
  ],
  [
    ['Year', 'Sales', { role: 'annotation' }, 'Expenses', { role: 'style' }, 'Profit', { role: 'annotation' }],
    ['2014', 1000, 1000, 400, '', 200, 200],
    ['2015', 1170, 1170, 460, 'black', 250, 250],
    ['2016', 660, 660, 1120, 'yellow', 300, 300],
    ['2017', 1030, 1030, 540, 'green', 350, 350],
  ]
];
