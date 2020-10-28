import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare var google: any;
declare var googleLoaded: any;

@Directive({
  selector: '[GoogleChart]'
})
export class GoogleChartComponent implements OnInit {

  public _element: any;
  @Input('chartType') public chartType: string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  @Input('elementID') public elementID: Object;

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
    console.log('Elements for Chart: ', this._element)
  }
  ngOnInit() { }

  ngOnChanges(changes) {
    google.charts.load('current', { 'packages': ['corechart', 'bar', 'table', 'line'] });
    console.log('ngOnChanges elementRef ', this._element);
    // console.log('ngOnChanges elementID ', this.elementID);
    this.drawGraph(
      this.chartOptions,
      this.chartType,
      this.chartData,
      this._element);

  }
  ChartWrappers(chartType, chartData, chartOptions, ele) {
    var wrapper;
    wrapper = new google.visualization.ChartWrapper({
      chartType: chartType,
      dataTable: chartData,
      options: chartOptions || {},
      containerId: ele.id
    });
    wrapper.draw();
  }

  DataTables(columns, rows, options, ele, chartType) {
    let data = new google.visualization.DataTable();
    columns.forEach(column => {
      data.addColumn(column.type, column.name);
    });

    data.addRows(rows);

    if (chartType == 'LineChart') {
      let chart = new google.charts.Line(document.getElementById(ele.id));
      chart.draw(data, google.charts.Line.convertOptions(options));
    } else if (chartType == 'TableChart') {
      let table = new google.visualization.Table(document.getElementById(ele.id));
      table.draw(data, options);
    }
  }

  drawGraph(chartOptions, chartType, chartData, ele) {
    google.charts.setOnLoadCallback(drawChart);
    let self = this;
    function drawChart() {
      if (chartType == 'LineChart' || chartType == 'TableChart') self.DataTables(chartData.columns, chartData.rows, chartOptions || {}, ele, chartType);
      else self.ChartWrappers(chartType, chartData, chartOptions, ele);
    }
  }


}
