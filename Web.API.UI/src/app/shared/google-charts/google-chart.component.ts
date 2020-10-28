import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IChart, IPieSettings } from './google-charts.models';

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.scss']
})
export class GoogleChartTemplateComponent implements OnInit {

  /* Dependencies

  Materail Design
  Flex Layout
  */

  /* Step to use:

  npm i google-charts
  add to index.html -> <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

  Include to module or shared module: {

    declarations: [
      GoogleChartTemplateComponent,
      GoogleChartComponent,
      PieChartComponent,
    ],
    exports: [
      GoogleChartTemplateComponent,
      GoogleChartComponent,
      PieChartComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  }

  to call the module use:
    <app-google-chart [chartType]="'pie'" [chartData]="" [chartSettings]=""></app-google-chart>

  Use chart interface: IChartData, Icharts;

  Separeted interfaces:
    IPie, IPieSettings;

  */

  @Input() chartType: null | 'pie' | 'bar' | 'line' | 'combo' = null;
  @Input() chartData: IChart;
  @Input() chartSettings: IPieSettings;
  @Input() elementID: string = Math.random().toString();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('elementID ', this.elementID)
  }
}
