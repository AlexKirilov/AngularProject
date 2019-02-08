import { Component, OnInit, ViewChild } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { MatTableDataSource, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';
import { DatastoreService } from '../../services/datastore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  dataSource = new MatTableDataSource([]);
  displayedColumns = ['name', 'image', 'price', 'quantity', 'total'];
  totalAmount = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService
  ) {
    datashare.getBasket.subscribe(basket => {
      basket.map( (item: any) => {
        let packDig = item.pack.match(/\d/g);
        packDig = (packDig && packDig.length > 0) ? packDig.join('') : 1;
        item.total = (item.price - item.discount) * (item.prodClientQnt * packDig);
        this.totalAmount += item.total;
      });
      basket.length === 0 ? this.router.navigate(['/products']) : this.dataSource.data = basket;
    });
  }

  ngOnInit() {
  }

  sendForConfirmation() {
    console.log(this.dataSource.data);
    this.datastore.addOrder(this.dataSource.data, (res) => {
      this.datashare.changeBasket([]); // Empty the basket
      this.router.navigate(['/products']); // relocating the user to products page
    });
  }
}
