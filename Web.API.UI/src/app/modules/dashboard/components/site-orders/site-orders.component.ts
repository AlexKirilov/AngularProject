import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Unsubscribable } from 'rxjs';
import { HandleErrorsService } from '../../../../services/handle-errors.service';
import { ServiceProvider } from '../../../../services/services.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-orders',
  templateUrl: './site-orders.component.html',
  styleUrls: ['./site-orders.component.scss']
})
export class SiteOrdersComponent implements OnInit, OnDestroy {

  step = null;
  ordersForApproval = [];
  employeesGroup: FormGroup;

  displayedColumns = ['name', 'image', 'price', 'prodClientQnt', 'total'];
  tableColumnNames = { name: 'Name', image: '', price: 'Price', prodClientQnt: 'Qnt', total: 'Total' };
  dateTransformNames = [];

  public startRow = 1;
  public allPages = 0;
  public allRecords = 0;
  public currentPage = 1;
  public itemsPerPage = '25';
  public endRow = this.itemsPerPage;

  private datashare: any;
  private datastore: any;
  private unsgetData: Unsubscribable;
  private unsEditOrder: Unsubscribable;

  constructor(
    private errorHandler: HandleErrorsService,
    private service: ServiceProvider,
  ) {
    this.datashare = this.service.datashare;
    this.datastore = this.service.datastore;
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsgetData) { this.unsgetData.unsubscribe(); }
    if (this.unsEditOrder) { this.unsEditOrder.unsubscribe(); }
  }

  getData() {
    this.datashare.startSpinnerContent();
    const by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}`;
    this.unsgetData = this.datastore.getAllOrders(by).subscribe(
      (data: any) => {
        this.allPages = data.pages;
        this.allRecords = data.rows;
        this.currentPage = data.page;
        this.itemsPerPage = data.perPage + '';
        this.endRow = data.lastRowOnPage;
        this.startRow = data.firstrowOnPage;
        this.ordersForApproval = data.results;
        this.datashare.stopSpinnerContent();
      },
      (err: Error) => this.errorHandler.handleError(err)
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  editOrder(flag: number, orderId: string) {
    this.unsEditOrder = this.datastore.editOrder({ flag, orderId }).subscribe(
      (res: any) => {
        this.getData();
        console.log('REEESS', res);
      },
      (err: Error) => this.errorHandler.handleError(err)
    );
  }

  decline(order: any) {
    this.editOrder(-1, order._id);
  }

  accept(order: any) {
    this.editOrder(1, order._id);
  }

  sendToClient(order: any) {
    this.editOrder(2, order._id);
  }

  deliveredToClient(order: any) {
    this.editOrder(3, order._id);
  }

  changePageTo(page: number) {
    this.currentPage = page;
    this.getData();
  }

  changeItemsPerPage(perPage: any) {
    this.itemsPerPage = perPage;
    this.getData();
  }

}
