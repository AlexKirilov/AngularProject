import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  purchases;
  dataaa;
  step = 0;
  displayedColumns = ['name', 'image', 'price', 'prodClientQnt', 'total'];
  tableColumnNames = { name: 'Name', image: '', price: 'Price', prodClientQnt: 'Qnt', total: 'Total' };
  totalAmount = 0;
  dateTransformNames = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private datastore: DatastoreService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData () {
    this.datastore.getOrdersToConfirm(data => {
      this.dataaa = data.results;
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

  decline(order) {
    this.datastore.editOrder( {flag: -1, orderId: order.id}, (res) => {
      console.log('REEESS', res);
    });
  }

  accept(order) {
    this.datastore.editOrder( {flag: 1, orderId: order.id}, (res) => {
      console.log('REEESS', res);
    });
  }
}
