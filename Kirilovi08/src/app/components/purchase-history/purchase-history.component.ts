import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  dataaa;
  step = 0;
  displayedColumns = ['name', 'image', 'price', 'quantity', 'total'];
  tableColumnNames = { name: 'Name', image: '', price: 'Price', quantity: 'Qnt', total: 'Total' };
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
    this.datastore.getOrders(data => {
      this.dataaa = data.results;
      console.log(data.results);
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
}
