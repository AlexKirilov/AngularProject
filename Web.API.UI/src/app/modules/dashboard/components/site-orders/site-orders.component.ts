import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';
import { DatashareService } from '../../../../services/datashare.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-orders',
  templateUrl: './site-orders.component.html',
  styleUrls: ['./site-orders.component.scss']
})
export class SiteOrdersComponent implements OnInit {

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
  constructor(
    private datashare: DatashareService,
    private datastore: DatastoreService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // let filters = {
    //   perPage: this.itemsPerPage,
    //   page: this.currentPage,
    //   sortBy: {date: 'asc'},
    // }
    this.datashare.startSpinnerContent();
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}`;
    this.datastore.getAllOrders(by, (data: any) => {
      this.allPages = data.pages;
      this.allRecords = data.rows;
      this.currentPage = data.page;
      this.itemsPerPage = data.perPage + '';
      this.endRow = data.lastRowOnPage;
      this.startRow = data.firstrowOnPage;
      this.ordersForApproval = data.results;
      this.datashare.stopSpinnerContent();
    });

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
    this.datastore.editOrder({ flag, orderId }, (res: any) => {
      this.getData();
      console.log('REEESS', res);
    });
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
