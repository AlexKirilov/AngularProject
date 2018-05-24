import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public categories = [];
  public prodName = '';
  public selectedCat;

  displayedColumns = ['name', 'remove'];
  dataSource;
  constructor(
    private data: DatastoreService,
  ) { }

  getProducts() {
    this.data.getProducts('',
      data => {
        this.products = data;
        this.dataSource = data;
      }
    );
  }
  ngOnInit() {
    this.getCats();
    this.getProducts();
  }

  getCats() {
    this.data.getCategories( data => this.categories = data);
  }
  addProd() {
    const tmp = { name: this.prodName, category: this.selectedCat };
    this.data.addProducts(tmp, data => { this.getProducts(); });
  }
  showProtByCat() {
    this.data.getProducts({category: this.selectedCat},
      data => {
        this.products = data;
      }
    );
  }
  removeProd(item) {
    console.log(item);
    this.data.removeProductbyIdOrCategory(item, data => { console.log(data); this.getProducts(); });
  }
  removeProdByCat() {
    this.data.removeProductbyIdOrCategory({catId: this.selectedCat}, data => { console.log(data); this.getProducts(); });
  }
  // removeAllProd(item) {
  //   this.data.removeAllProductbyCategory(data => { console.log(data); this.getProducts(); })
  // }

}
