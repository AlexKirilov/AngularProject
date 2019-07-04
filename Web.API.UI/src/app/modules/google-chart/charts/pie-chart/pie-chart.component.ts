import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IPieSettings } from '../../google-charts.models';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() pie_ChartData: any;
  @Input() settings: IPieSettings;
  @Input() elementID: string;

  public addActivityControl: FormGroup;

  public pie_ChartOptions;

  public fontsize = new FormControl('14', [Validators.required]);
  public pieHoleSize = new FormControl(0.5, [Validators.required]);
  public is3DBool = new FormControl('true', [Validators.required]);
  public isTooltip = new FormControl('focus', [Validators.required]);
  public legendTxtStyle = new FormControl('#000', [Validators.required]);
  public tooltipDataType = new FormControl('both', [Validators.required]);
  public pieSliceTextType = new FormControl('value', [Validators.required]);
  public pieSliceTextColor = new FormControl('#000', [Validators.required]);
  public legendPosition = new FormControl('labeled', [Validators.required]);
  public isSettings = false;

  private default_pie_ChartData = [['Task', 'Delegate Status'], ['Walk', 5], ['Run', 5], ['Eat', 5]];


  constructor(public fb: FormBuilder) {
    this.addActivityControl = fb.group({
      'activityTxt': ['', Validators.required],
      'activityNum': ['', [Validators.required, Validators.max(100)]],
    });
  }

  ngOnInit() {
    this.pie_ChartData = this.default_pie_ChartData; // Default values
    this.pie_ChartOptions = this.pie_ChartOptionsChange(); // Default values
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.pie_ChartData) {
      this.pie_ChartData = this.default_pie_ChartData; // Default values
    }
    if (!this.settings) {
      this.pie_ChartOptions = this.pie_ChartOptionsChange(); // Default values
    } else {
      this.pie_ChartOptions = this.pie_ChartOptionsChange(
        this.settings.title, this.settings.is3DBool, this.settings.pieHoleSize, this.settings.pieSliceTextType, this.settings.pieSliceTextColor,
        this.settings.tooltipType, this.settings.tooltipDataType, (this.settings.legend) ? this.settings.legend.legendPosition : null,
        (this.settings.legend) ? this.settings.legend.textStyle.color : null, this.settings.fontsize
      );
    }
  }

  onChartChange() {
    this.pie_ChartOptions = this.pie_ChartOptionsChange(
      this.is3DBool.value, this.pieHoleSize.value, this.pieSliceTextType.value, this.pieSliceTextColor.value,
      this.isTooltip.value, this.tooltipDataType.value, this.legendPosition.value, this.legendTxtStyle.value, this.fontsize.value);
  }

  addActivity() {
    if (this.addActivityControl.value.activityNum > 100) {
      this.addActivityControl.value.activityNum = 100;
    }
    if (this.addActivityControl.value.activityNum < 0) {
      this.default_pie_ChartData = this.default_pie_ChartData.filter(item => {
        return !item.includes(this.addActivityControl.value.activityTxt);
      });
      this.pie_ChartData = JSON.parse(JSON.stringify(this.default_pie_ChartData));
    } else if (this.default_pie_ChartData.filter(item => {
      if (item.includes(this.addActivityControl.value.activityTxt)) {
        return true;
      } else {
        return false;
      }
    }).length === 0) {
      this.default_pie_ChartData.push([this.addActivityControl.value.activityTxt, this.addActivityControl.value.activityNum]);
      this.pie_ChartData = JSON.parse(JSON.stringify(this.default_pie_ChartData)); // WHY
    } else {
      if (this.default_pie_ChartData.filter(item => {
        if (item.includes(this.addActivityControl.value.activityTxt) && !item.includes(this.addActivityControl.value.activityNum)) {
          item[1] = this.addActivityControl.value.activityNum;
          return true;
        }
        return false;
      }).length > 0) {
        this.pie_ChartData = JSON.parse(JSON.stringify(this.default_pie_ChartData));
      }
    }

  }

  pie_ChartOptionsChange(
    title: string = 'My Daily Activities',
    is3DBool: Boolean = true,
    pieHoleSize: number = 0.5, // between 0 and 1
    pieSliceTextType: any = 'value', // 'percentage', 'value', 'label', 'none',
    pieSliceTextColor: string = '#000',
    isTooltip: string = 'focus', // focus, none, selection
    tooltipDataType: string = 'both', // both, percentage, value
    legendPosition: string = 'labeled', // labeled, top ,left, right, bottom, none
    legendTxtStyle: string = '#000',
    fontsize: number = 14,
  ) {
    let width = 450;
    let height = 300;
    if (window.innerWidth < 400) {
      width = 300;
      height = 200;
    } else if (window.innerWidth < 500) {
      width = 350;
      height = 250;
    }
    return {
      title,
      width,
      height,
      // colors: ['#4fa7dc', '#a6d9f4', '#eeedee'],
      fontSize: fontsize,
      // fontName: '',
      chartArea: { width: '100%' },
      is3D: is3DBool, // true, false
      pieHole: pieHoleSize, // between 0 and 1
      pieSliceText: pieSliceTextType, // 'percentage', 'value', 'label', 'none',
      pieSliceTextStyle: { color: pieSliceTextColor, margin: '20' },
      tooltip: {
        trigger: isTooltip, // focus, none, selection
        // textStyle: {
        //   color: '',
        //   fontName: '',
        //   fontSize: fontsize,
        //   bold: false,
        //   italic: false
        // },
        text: tooltipDataType // both, percentage, value
      },
      slices: {
        1: { offset: 0.2 },
        2: { offset: 0.2 }
      },
      legend: {
        position: legendPosition, // labeled, top ,left, right, bottom, none
        maxLines: 1,
        alignment: 'end', // start, center, end
        textStyle: { color: legendTxtStyle, fontSize: 'fontsize', width: '100%' },
      }
    };
    // For more options see: 'https://developers.google.com/chart/interactive/docs/gallery/piechart'
  }
}
