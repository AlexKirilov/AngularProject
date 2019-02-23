import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatashareService } from '../../../../services/datashare.service';
import { UITourService } from '../../../../services/ui-tour.service';
import { DashboardTourData } from './site-dashboard.ui-tour-data';
import { Unsubscribable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ILineSettings, IPieSettings } from '../../../../modules/google-chart/google-charts.models';
import { HandleErrorsService } from '../../../../services/handle-errors.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class SiteDashboardComponent implements OnInit, OnDestroy {

  public toggleChartSettings = false;

  public charts: any;

  public sales: any = { columns: Array, rows: Array };
  public line_ChartSettings: ILineSettings = new Object() as ILineSettings;

  public productsChartData: Array<any>;
  public depletedProductsList = [];
  public prodPie_ChartSettings: IPieSettings = new Object() as IPieSettings;

  public upToTopTen: Array<Object>;
  public upToTopTenSettings: IPieSettings = new Object() as IPieSettings;

  public upToBottomTen: Array<Object>;
  public upToBottomTenSettings: IPieSettings = new Object() as IPieSettings;

  public orderStat: Array<Object>;
  public orderStatSettings: IPieSettings = new Object() as IPieSettings;

  private unsubscribePageTour: Unsubscribable;
  private unsGetSalesChartsData: Unsubscribable;
  private unsGetProdChartsData: Unsubscribable;
  private unsGetSalesTopLeastCharData: Unsubscribable;
  private unsGetOrdersStatChartData: Unsubscribable;

  constructor(
    private titleService: Title,
    private tourData: DashboardTourData,
    private datashare: DatashareService,
    private uiTourService: UITourService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) {
    this.titleService.setTitle('Dashboard');
    this.datashare.changeCurrentPage('dashboard');

    this.charts = {
      salesStat: new FormControl(true),
      salesMost: new FormControl(true),
      salesLeast: new FormControl(true),
      productsQnt: new FormControl(true),
      orderStat: new FormControl(true),
    };
  }

  ngOnInit() {
    this.unsubscribePageTour = this.datashare.pageTourTrigger.subscribe((tourPage) => {
      if (tourPage === 'dashboard') { this.startTour(); }
    });

    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsubscribePageTour) { this.unsubscribePageTour.unsubscribe(); }
    if (this.unsGetProdChartsData) { this.unsGetProdChartsData.unsubscribe(); }
    if (this.unsGetSalesChartsData) { this.unsGetSalesChartsData.unsubscribe(); }
    if (this.unsGetSalesTopLeastCharData) { this.unsGetSalesTopLeastCharData.unsubscribe(); }
  }

  startTour() {
    this.uiTourService.startTour(this.tourData.TourSteps, this.tourData.TourRequirements, (selection: string) => {
      this.tourData.onShow(selection);
    });
  }

  getData() {
    this.getSales(7);
    this.getSalesTopBottomList();
    this.getProdcuts();
    this.getOrderStat();
  }

  getSales(days: number = 7) {
    if (this.charts.salesStat.value) {
      this.datashare.startSpinnerContent();

      const contWitdth = Number(document.getElementById('dashboard-container').clientWidth);

      this.unsGetSalesChartsData = this.datastore.getSalesChartData(days).subscribe(
        (data: any) => {
          const tmpData = this.setChartData(data);
          this.editLineSettings(days, contWitdth, tmpData);
          this.datashare.stopSpinnerContent();
        },
        (err: any) => this.errorHandler.handleError(err)
      );
    }
  }

  setChartData(data: any) {
    this.sales.columns = [
      { type: 'string', name: 'Days' },
      { type: 'number', name: 'Sales' },
      // { type: 'number', name: 'annotations' },
    ];
    const tmpData: any = objToArrayOfArrays(data);
    this.sales.rows = tmpData.rows;
    return tmpData;
  }

  getSalesTopBottomList() {
    if (this.charts.salesLeast.value || this.charts.salesMost.value) {
      this.datashare.startSpinnerContent();
      let tmpSize = 0;
      let tmpTopTen = [];
      let tmpBotTen = [];

      this.upToTopTenSettings.title = 'Top 10 Most Sales Product';
      this.upToBottomTenSettings.title = 'Top 10 Least Sales Product';

      this.unsGetSalesTopLeastCharData = this.datastore.getSalesTopBottomList().subscribe(
        (data: any) => {
          tmpSize = Math.round(data.length / 2);
          tmpTopTen = data.slice(0, (tmpSize > 10) ? 10 : tmpSize);
          tmpBotTen = data.slice(Math.max(data.length - ((tmpSize > 10) ? 10 : tmpSize), 0));

          this.upToTopTen = convertObjToPiechartData(tmpTopTen, this.upToTopTenSettings.title || '');
          this.upToBottomTen = convertObjToPiechartData(tmpBotTen, this.upToBottomTenSettings.title || '');

          this.datashare.stopSpinnerContent();
        },
        (err: any) => this.errorHandler.handleError(err)
      );
    }
  }

  getProdcuts() {
    if (this.charts.productsQnt.value) {
      this.datashare.startSpinnerContent();
      this.prodPie_ChartSettings.title = 'Products Quantity';

      this.unsGetProdChartsData = this.datastore.getProductsChartData().subscribe(
        (data: any) => {
          this.productsChartData = data;

          if (data) { // Check for depleted Products
            this.depletedProductsList = [];

            data.forEach( (prod: any) => {
              if (!prod[1]) {
                this.depletedProductsList.push({ name: prod[0], qnt: prod[1] });
              }
            });
            this.datashare.stopSpinnerContent();
          }
        },
        (err: any) => this.errorHandler.handleError(err)
      );
    }
  }

  getOrderStat() {
    if (this.charts.orderStat.value) {
      this.datashare.startSpinnerContent();
      this.orderStatSettings.title = 'Current orders status';

      this.unsGetOrdersStatChartData = this.datastore.getOrdersStatistics().subscribe(
        (stat: any) => {
          this.orderStat = stat;
          this.datashare.stopSpinnerContent();
        },
        (err: any) => this.errorHandler.handleError(err)
      );
    }
  }

  editLineSettings(days: number, contWitdth: number, tmpData: any) {
    // Modify the settings
    this.line_ChartSettings = {
      title: 'Sales',
      width: (days > 30 || contWitdth < 1000) ? this.line_ChartSettings.width = contWitdth : 1000,
      hAxis: {
        title: 'Days',
        direction: -1,
        viewWindow: {
          min: [-1, 0, 0]
        }
      },
      vAxis: {
        title: 'Orders per day',
        viewWindow: {
          min: 0,
          max: (tmpData.maxValue + 5) || 5000,
        },
      },
    };
  }
}

function objToArrayOfArrays(arr: object) {
  const keys = Object.keys(arr);
  const values = Object.values(arr);
  const result = { rows: [], maxValue: 0 };
  for (let a = 0; a < keys.length; a++) {
    if (result.maxValue < values[a]) {
      result.maxValue = values[a];
    }
    result.rows.push([keys[a], values[a]]);
  }
  return result;
}

function convertObjToPiechartData(arr: Array<object> = [{}], task: string = '') {
  // [['Task', 'Delegate Status'], ['Walk', 5], ['Run', 5], ['Eat', 5]];
  const tmp = [['Task', task]];
  arr.forEach((el: any) => {
    tmp.push([el.key, el.value]);
  });
  return tmp;
}
