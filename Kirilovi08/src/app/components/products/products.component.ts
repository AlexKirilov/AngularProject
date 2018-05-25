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
  public editbtn = false;
  public ifAdmin = true;

  productName = '';

  displayedColumns = ['name', 'image', 'sort', 'details'];
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
  editProd(el) {
    this.editbtn = !this.editbtn;
  }
  saveProd(el) {
    
    this.editbtn = !this.editbtn;
    el.name = this.productName;
    console.log(el);
    this.data.editProducts(el, (data) => {console.log('Edit Product: ', data)});
  }
  addProd() {
    const tmp = { name: this.prodName, categoryID: this.selectedCat };
    this.data.addProducts(tmp, data => { this.getProducts(); });
  }

  showProtByCat() {
    this.data.getProducts({categoryID: this.selectedCat},
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
    console.log(this.selectedCat)
    this.data.removeProductbyIdOrCategory({categoryID: this.selectedCat}, data => { console.log(data); this.getProducts(); });
  }
  // removeAllProd(item) {
  //   this.data.removeAllProductbyCategory(data => { console.log(data); this.getProducts(); })
  // }

}
