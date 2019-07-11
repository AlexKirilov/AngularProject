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

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  purchases;
  dataaa;
  public step = 0;
  public displayedColumns = ['name', 'image', 'price', 'prodClientQnt', 'total'];
  public tableColumnNames = { name: 'Name', image: '', price: 'Price', prodClientQnt: 'Qnt', total: 'Total' };
  public totalAmount = 0;
  public dateTransformNames = [];


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
    this.unscGetOrderToConfirm = this.datastore.getOrdersToConfirm().subscribe(
      data => {
        this.dataaa = data.results;
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
}
