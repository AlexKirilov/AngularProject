import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DatashareService } from 'src/app/services/datashare.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

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
  private unscGetCustomerAddress: Unsubscribable;
  constructor(
    private titleService: Title,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
    private modalHandler: ModalHandlerService,
  ) {
    this.titleService.setTitle('Purchases');
    this.datashare.changeCurrentPage('purchases');
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscEditOrder) { this.unscEditOrder.unsubscribe(); }
    if (this.unscGetOrderToConfirm) { this.unscGetOrderToConfirm.unsubscribe(); }
    if (this.unscGetCustomerAddress) { this.unscGetCustomerAddress.unsubscribe(); }
  }

  getData() {
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}&flags=BCD`;
    this.unscGetOrderToConfirm = this.datastore.getAllOrders(by).subscribe( // this.datastore.getOrdersToConfirm().subscribe(
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

  
  editOrder(flag: number, orderId: string) {
    this.unscEditOrder = this.datastore.editOrder({ flag, orderId }).subscribe(
      (res: any) => {
        this.getData();
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

  getAddress(clientID: string) {
    this.unscGetCustomerAddress = this.datastore.getCustomerAddress({ userId: clientID }).subscribe(address => {
      this.modalHandler.openDialogClientAddress(address, (d: any) => console.log('Address', d));
    });
  }
}
