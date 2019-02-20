import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from '../google-chart/google-chart.component';
import { debug } from 'util';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss']
})
export class ComboChartComponent implements OnInit {

  public combo_ChartData;
  public combo_ChartOptions;
  public combo_title;


  public reverse = new FormControl(true, [Validators.required]);              // true / false
  public chartSize = new FormControl('m', [Validators.required]);
  public seriesAVG = new FormControl('line', [Validators.required]);          // line, area, bars, candlesticks, steppedArea
  public seriesType = new FormControl('bars', [Validators.required]);         // line, area, bars, candlesticks, steppedArea
  public legendPos = new FormControl('right', [Validators.required]);         // legend.position -> top, left, bottom, right, in, none
  public tooltipTrigger = new FormControl('focus', [Validators.required]);    // focus, selection, none
  public orientation = new FormControl('horizontal', [Validators.required]);  //  horizontal or vertical

  private default_combo_ChartData = [
    ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
    ['2004/05', 165, 938, 522, 998, 450, 614.6],
    ['2005/06', 135, 1120, 599, 1268, 288, 682],
    ['2006/07', 157, 1167, 587, 807, 397, 623],
    ['2007/08', 139, 1110, 615, 968, 215, 609.4],
    ['2008/09', 136, 691, 629, 1026, 366, 569.6]
  ]

  default_combo_ChartOptions(
    sizeType: string = 'medium',
    legendPos: string = 'right',
    reverseCategories: boolean = true,
    tooltipTrigger: string = 'focus',   // focus selection, both
    orientation: string = 'horizontal', // vertical, horizontal
    seriesType: string = 'bars',        //  'line', 'area', 'bars', 'candlesticks', 'steppedArea'.
    seriesAVG: string = 'line'
  ) {
    let width: number = 800;
    let height: number = 600;
    if (sizeType == 's') {
      width = 600;
      height = 400;
    } else if (sizeType == 'm') {
      width = 800;
      height = 500;
    } else if (sizeType == 'l') {
      width = 1000;
      height = 600;
    }
    if (window.innerWidth < 400) {
      width = 350; height = 300;
    } else if (window.innerWidth < 600) {
      width -= width / 2; height = 300;
    } else if (window.innerWidth < 800) {
      width -= width / 3; height = 400;
    } else if (window.innerWidth < 1000) {
      width -= width / 4
    }

    return {
      title: 'Monthly Coffee Production by Country',
      legend: {
        position: legendPos
      },
      width,
      height,
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 18,
          color: '#000',
          auraColor: 'none'
        }
      },
      tooltip: { trigger: tooltipTrigger }, // focus, selection, both
      hAxis: {
        title: 'Month',
      },
      vAxis: {
        title: 'Cups',
      },
      reverseCategories,
      orientation,
      seriesType,
      series: {
        5: { type: seriesAVG }
      },
    }
  };

  constructor() { }

  ngOnInit() {
    this.combo_ChartData = this.default_combo_ChartData; // Default values
    this.combo_ChartOptions = this.default_combo_ChartOptions(); // Default values
  }

  onChartChange() {
    this.combo_ChartOptions = this.default_combo_ChartOptions(
      this.chartSize.value, //medium
      this.legendPos.value,  //right
      this.reverse.value, // true / false
      this.tooltipTrigger.value, // focus selection, both
      this.orientation.value, // vertical, horizontal
      this.seriesType.value, // line, area, bars, candlesticks, steppedArea
      this.seriesAVG.value // { 5: { type: 'line' } }
    );
  }

}
