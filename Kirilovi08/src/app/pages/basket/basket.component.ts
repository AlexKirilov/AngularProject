import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';
import { Unsubscribable } from 'rxjs';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource = new MatTableDataSource([]);
  public displayedColumns = ['name', 'image', 'price', 'quantity', 'total'];
  public totalAmount = 0;
  public ifAdmin: Boolean = false;
  public ifUser: Boolean = false;

  private unscAddOrder: Unsubscribable;
  private unscGetBasket: Unsubscribable;

  constructor(
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) {
    this.datashare.ifUser.subscribe(bool => { this.ifUser = bool; });
    this.datashare.ifAdmin.subscribe(bool => { this.ifAdmin = bool; });
  }

  ngOnInit() {
    this.getBasketData();
  }

  ngOnDestroy(): void {
    if (this.unscAddOrder) { this.unscAddOrder.unsubscribe(); }
    if (this.unscGetBasket) { this.unscGetBasket.unsubscribe(); }
  }

  getBasketData() {
    this.unscGetBasket = this.datashare.getBasket.subscribe(basket => {
      this.totalAmount = 0;
      basket.map((item: any) => {
        let packDig = item.pack.match(/\d/g);
        packDig = (packDig && packDig.length > 0) ? packDig.join('') : 1;
        item.total = (item.price - item.discount) * (item.prodClientQnt * packDig);
        this.totalAmount += item.total;
      });
      basket.length === 0 ? this.router.navigate(['/products']) : this.dataSource.data = basket;
    });
  }

  sendForConfirmation() {
    this.unscAddOrder = this.datastore.addOrder(this.dataSource.data).subscribe(
      () => {
        this.datashare.changeBasket([]); // Empty the basket
        this.router.navigate(['/products']); // relocating the user to products page
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  incrementQnt(product) {
    if (product.prodClientQnt < product.quantity) {
      product.prodClientQnt++;
      this.basket(product);
    }
  }
  decrementQnt(product) {
    if (product.prodClientQnt > 0) {
      product.prodClientQnt--;
      this.basket(product);
    }
    if (product.prodClientQnt === 0) {
      this.basket(product);
    }
  }

  basket(product) {
    if (product.prodClientQnt === 0) {
      this.dataSource.data = this.dataSource.data.filter(item => {
        return item._id !== product._id;
      });
    } else if (!this.dataSource.data.find(item => {
      return item._id === product._id;
    })) {
      this.dataSource.data.push(product);
    } else {
      this.dataSource.data.forEach(item => {
        if (item._id === product._id) {
          item.prodClientQnt = product.prodClientQnt;
        }
      });
    }
    this.datashare.changeBasket(this.dataSource.data);
  }
}
