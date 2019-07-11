import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataaa: any;
  public step = 0;
  public displayedColumns = ['name', 'image', 'price', 'quantity', 'total'];
  public tableColumnNames = { name: 'Name', image: '', price: 'Price', quantity: 'Qnt', total: 'Total' };
  public totalAmount = 0;
  public dateTransformNames = [];

  private unscGetOrders: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscGetOrders) { this.unscGetOrders.unsubscribe(); }
  }

  getData() {
    this.unscGetOrders = this.datastore.getOrders().subscribe(
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
}
