import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';
import { DatashareService } from 'src/app/services/datashare.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public step = null;
  public totalAmount = 0;
  public purchasesList = [];
  public dateTransformNames = [];
  public displayedColumns = ['name', 'image', 'price', 'quantity', 'total'];
  public tableColumnNames = { name: 'Name', image: '', price: 'Price', quantity: 'Qnt', total: 'Total' };

  public filter = null;
  public startRow = 1;
  public allPages = 0;
  public allRecords = 0;
  public currentPage = 1;
  public itemsPerPage = '10';
  public endRow = this.itemsPerPage;

  private unscGetOrders: Unsubscribable;
  private unscEditOrder: Unsubscribable;

  constructor(
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscGetOrders) { this.unscGetOrders.unsubscribe(); }
    if (this.unscEditOrder) { this.unscEditOrder.unsubscribe(); }
  }

  getData() {
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}&flags=BCD`;
    this.unscGetOrders = this.datastore.getAllOrders(by).subscribe(
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
      () => {
        this.datashare.showSnackBar({ message: `Ordert '${order.id}' was`, action: 'declined' })
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  accept(order: any) {
    this.unscEditOrder = this.datastore.editOrder({ flag: 1, orderId: order.id }).subscribe(
      () => this.datashare.showSnackBar({ message: `Ordert '${order.id}' was`, action: 'accepted' }),
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
