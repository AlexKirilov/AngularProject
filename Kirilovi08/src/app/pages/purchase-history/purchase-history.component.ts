import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';
import { DatashareService } from 'src/app/services/datashare.service';
import { Title } from '@angular/platform-browser';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

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
  private unscGetCustomerAddress: Unsubscribable;

  constructor(
    private titleService: Title,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
    private modalHandler: ModalHandlerService
  ) {
    this.titleService.setTitle('Purchase History');
    this.datashare.changeCurrentPage('purchase-history');
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscGetOrders) { this.unscGetOrders.unsubscribe(); }
    if (this.unscEditOrder) { this.unscEditOrder.unsubscribe(); }
    if (this.unscGetCustomerAddress) { this.unscGetCustomerAddress.unsubscribe(); }
  }

  getData() {
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}&flags=AE`;
    this.unscGetOrders = this.datastore.getAllOrders(by).subscribe(
      data => {
        this.startRow = data.firstrowOnPage;
        this.allPages = data.pages;
        this.allRecords = data.rows;
        this.currentPage = data.page;
        this.itemsPerPage = data.perPage + '';
        this.endRow = data.lastRowOnPage;
        // Calc Total for earch Order
        let total: number;
        data.results.forEach( (orders: any) => {
          total = 0;
          orders.order.forEach( (order: any) => {
            total += order.total
          });
          orders.total = total;
        });

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

  getAddress(clientID: string) {
    this.unscGetCustomerAddress = this.datastore.getCustomerAddress({ userId: clientID }).subscribe(address => {
      this.modalHandler.openDialogClientAddress(address, (d: any) => console.log('Address', d));
    });
  }
}
