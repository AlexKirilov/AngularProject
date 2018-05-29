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
  public newProdName = '';
  public selectedCat;
  public editbtn;
  public ifAdmin = true;

  prodName = '';
  prodSorts = '';
  prodDetails = '';

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
    this.prodName = el.name;
    this.prodSorts = el.sort.toString();
    this.prodDetails = el.details;
    this.editbtn = el._id;
  }
  saveProd(el) {
    this.editbtn = '';
    el.name = this.prodName;
    el.sort = this.prodSorts.split(',');
    el.sort = el.sort.filter( function (n) { return n !== undefined && n.trim() !== ''; });
    el.details = this.prodDetails;
    this.data.addEditProducts(el, (data) => { console.log('Edit Product: ', data); } );
  }
  addProd() {
    const tmp = { name: this.newProdName, categoryID: this.selectedCat };
    this.data.addEditProducts(tmp, data => { this.getProducts(); });
  }

  showProtByCat() {
    this.data.getProducts({categoryID: this.selectedCat},
      data => { this.products = data; }
    );
  }

  removeProd(item) {
    this.data.removeProductbyIdOrCategory(item,
      data => { console.log(data); this.getProducts(); });
  }
  removeProdByCat() {
    this.data.removeProductbyIdOrCategory({categoryID: this.selectedCat},
      data => { console.log(data); this.getProducts(); });
  }
  // removeAllProd(item) {
  //   this.data.removeAllProductbyCategory(data => { console.log(data); this.getProducts(); })
  // }

}
