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

  private unsubscribePageTour: Unsubscribable;
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

  constructor(
    private titleService: Title,
    private tourData: DashboardTourData,
    private datashare: DatashareService,
    private uiTourService: UITourService,
    private datastore: DatastoreService,
  ) {
    this.titleService.setTitle('Dashboard');
    this.datashare.changeCurrentPage('dashboard');

    this.charts = {
      salesStat: new FormControl(true),
      salesMost: new FormControl(true),
      salesLeast: new FormControl(true),
      productsQnt: new FormControl(true),
      orderStat: new FormControl(true),
    }

  }

  ngOnInit() {
    this.unsubscribePageTour = this.datashare.pageTourTrigger.subscribe((tourPage) => {
      if (tourPage === 'dashboard') { this.startTour(); }
    });

    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsubscribePageTour) { this.unsubscribePageTour.unsubscribe(); }
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

      let contWitdth = Number(document.getElementById('dashboard-container').clientWidth);

      this.datastore.getSalesChartData(
        days,
        (data: any) => {
          this.sales.columns = [
            { type: 'string', name: 'Days' },
            { type: 'number', name: 'Sales' },
            // { type: 'number', name: 'annotations' },
          ];
          let tmpData: any = this.objToArrayOfArrays(data);
          this.sales.rows = tmpData.rows;

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
          }
          this.datashare.stopSpinnerContent();
        });
    }
  }

  objToArrayOfArrays(arr: object) {
    const keys = Object.keys(arr);
    const values = Object.values(arr);
    let result = { rows: [], maxValue: 0 };
    for (let a = 0; a < keys.length; a++) {
      if (result.maxValue < values[a]) {
        result.maxValue = values[a];
      }
      result.rows.push([keys[a], values[a]]);
    }
    return result;
  }

  getSalesTopBottomList() {
    if (this.charts.salesLeast.value || this.charts.salesMost.value) {
      this.datashare.startSpinnerContent();
      let tmpSize: number = 0;
      let tmpTopTen = [];
      let tmpBotTen = [];

      this.upToTopTenSettings.title = 'Top 10 Most Sales Product';
      this.upToBottomTenSettings.title = 'Top 10 Least Sales Product';

      this.datastore.getSalesTopBottomList((data: Array<Object>) => {
        tmpSize = Math.round(data.length / 2);
        tmpTopTen = data.slice(0, (tmpSize > 10) ? 10 : tmpSize);
        tmpBotTen = data.slice(Math.max(data.length - ((tmpSize > 10) ? 10 : tmpSize), 0));

        this.upToTopTen = this.convertObjToPiechartData(tmpTopTen, this.upToTopTenSettings.title || '');
        this.upToBottomTen = this.convertObjToPiechartData(tmpBotTen, this.upToBottomTenSettings.title || '');

        this.datashare.stopSpinnerContent();
      });
    }
  }

  convertObjToPiechartData(arr: Array<object> = [{}], task: string = "") {
    // [['Task', 'Delegate Status'], ['Walk', 5], ['Run', 5], ['Eat', 5]];
    let tmp = [['Task', task]];
    arr.forEach((el: any) => {
      tmp.push([el.key, el.value]);
    });
    return tmp;
  }

  getProdcuts() {
    if (this.charts.productsQnt.value) {
      this.datashare.startSpinnerContent();
      this.prodPie_ChartSettings.title = 'Products Quantity'
      this.datastore.getProductsChartData((data: any) => {
        this.productsChartData = data;

        // Check for already depleted Products
        if (data) {
          this.depletedProductsList = [];

          data.forEach(prod => {
            if (!prod[1]) {
              this.depletedProductsList.push({ name: prod[0], qnt: prod[1] });
            }
          });
          this.datashare.stopSpinnerContent();
        }
      });
    }
  }

  getOrderStat() {
    if (this.charts.orderStat.value) {
      this.datashare.startSpinnerContent();
      this.orderStatSettings.title = 'Current orders status';

      this.datastore.getOrdersStatistics((stat: any) => {

        this.orderStat = stat;
        this.datashare.stopSpinnerContent();
      })
    }
  }
}