import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public step = null;
  public totalAmount = 0;
  public purchasesList = [];
  public dateTransformNames = [];
  public displayedColumns = ['name', 'image', 'price', 'prodClientQnt', 'total'];
  public tableColumnNames = { name: 'Name', image: '', price: 'Price', prodClientQnt: 'Qnt', total: 'Total' };

  public filter = null;
  public startRow = 1;
  public allPages = 0;
  public allRecords = 0;
  public currentPage = 1;
  public itemsPerPage = '10';
  public endRow = this.itemsPerPage;

  private unscEditOrder: Unsubscribable;
  private unscGetOrderToConfirm: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscEditOrder) { this.unscEditOrder.unsubscribe(); }
    if (this.unscGetOrderToConfirm) { this.unscGetOrderToConfirm.unsubscribe(); }
  }

  getData() {
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}&flags=AE`;
    this.unscGetOrderToConfirm = this.datastore.getAllOrders(by).subscribe( // this.datastore.getOrdersToConfirm().subscribe(
      data => {
        this.startRow = data.firstrowOnPage;
        this.allPages = data.pages;
        this.allRecords = data.rows;
        this.currentPage = data.page;
        this.itemsPerPage = data.perPage + '';
        this.endRow = data.lastRowOnPage;
        this.purchasesList = data.results;
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
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

  decline(order: any) {
    this.unscEditOrder = this.datastore.editOrder({ flag: -1, orderId: order.id }).subscribe(
      (res) => {
        console.log('REEESS', res);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  accept(order: any) {
    this.unscEditOrder = this.datastore.editOrder({ flag: 1, orderId: order.id }).subscribe(
      result => console.log('REEESS', result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
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
