import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { Product } from '../../interfaces/product';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { DatashareService } from '../../services/datashare.service';
import { MatSort, MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public categories = [];
  public newProdName = '';
  public selectedCat = '';
  public prodQuantity = 0;
  public prodPrice = 0;
  public prodClientQnt = 0;
  public packageSize = '';
  public imageURL = '';
  public editbtn;
  public basketArr = [];
  public ifAdmin;
  public ifUser;
  public deleteConfirmation;
  public serverPagging = true;
  public toPage = 1;
  public perPage = 5;
  public lengthPag = 0;
  public pageSizePag = 0;
  public prodName = '';
  public prodSorts = '';
  public prodDetails = '';
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];


  displayedColumns = ['name', 'image', 'sort', 'details'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private data: DatastoreService,
    private datashare: DatashareService,
    private errorHandler: HandleErrorsService
  ) {
    this.datashare.ifUser.subscribe(bool => { this.ifUser = bool; if (bool) { this.changeTableColumns(); } });
    this.datashare.ifAdmin.subscribe(bool => { this.ifAdmin = bool; if (bool) { this.changeTableColumns(); } });
    this.datashare.getBasket.subscribe(basket => this.basketArr = basket);
    this.deleteConfirmation = {
      Type: 'prompt',
      ErrorMessage: `Are you sure that you wish to delete all records?`,
    };
  }

  changeTableColumns () {
    this.displayedColumns = ['name', 'image', 'sort', 'price', 'quantity'];
    if (this.ifUser && !this.ifAdmin) { this.displayedColumns.push('qnt'); }
    if (this.ifAdmin) { this.displayedColumns.push('controlers'); }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this.serverPagging) {
      this.sort.sortChange.subscribe(() => {
        this.getProducts();
      });
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    this.perPage = e.pageSize;
    this.toPage = e.pageIndex + 1;
    this.getProducts();
  }

  getProducts() {
    this.data.getProducts({
      sortBy: this.sort,
      perPage: this.perPage,
      page: this.toPage
    },
      data => {
        // Adding Client Qnt saver
        data.results.forEach(el => {
          const tmp  = this.basketArr.find( item => {
            return item._id === el._id;
          });
          el.prodClientQnt = (this.basketArr.length === 0) ? 0 : tmp ? tmp.prodClientQnt : 0;
        });
        console.log(data);
        this.dataSource.data = data.results;
        this.pageSizePag =  data.perPage;
        this.lengthPag = data.rows;
      }
    );
  }
  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.data.getCategories( data => {
      this.categories = data;
      category[0].selectors = data;
      (addProduct.filter(item => {
        return item.field === 'category';
      }).length > 0) ? addProduct[1].selectors = data : addProduct.push(category[0]);
    });
  }

  editProd(el) {
    this.prodName = el.name;
    this.prodSorts = el.sort.toString();
    this.prodDetails = el.details;
    this.editbtn = el._id;
    this.prodQuantity = el.quantity || 0;
    this.prodPrice = el.price || 0.00;
    this.packageSize = el.pack || '';
    this.imageURL = el.imgURL || '';
  }

  saveProd(el) {
    this.editbtn = '';
    el.name = this.prodName;
    el.sort = this.prodSorts.split(',');
    el.sort = el.sort.filter( function (n) { return n !== undefined && n.trim() !== ''; });
    el.details = this.prodDetails;
    el.quantity = this.prodQuantity || 0;
    el.price = this.prodPrice || 0;
    el.pack = this.packageSize || '';
    el.imgURL = this.imageURL || '';
    this.data.addEditProducts(el, (data) => {
      // console.log('Edit Product: ', data);
    } );
  }

  addProd() {
      this.errorHandler.openDialogInputs({
        msg: 'Add new product',
        data: addProduct
      },
        res => {
          if (res) {
            const tmp = { name: '', categoryID: '', date: new Date() };
            res.forEach(item => {
              if (item.field === 'product') {
                tmp.name = item.value;
              } else if (item.field === 'category') {
                tmp.categoryID = item.value;
              }
            });
            this.data.addEditProducts(tmp, data => {
              this.getProducts();
              this.datashare.showSnackBar({
                message: 'Product was added',
                action: 'Successfully'
              });
            });
          }
        }
      );
  }

  addCategory () {
    this.errorHandler.openDialogInputs({
      msg: 'Add new category',
      data: addCategory
    },
      res => {
        if (res) {
          this.data.addCategoryOrSubcategory({ 'name': res[0].value } ,
          () => {
            this.getCategories();
            this.datashare.showSnackBar({
              message: 'Category was added',
              action: 'Successfully'
            });
          }
        );
        }
      }
    );
  }

  showProtByCat() {
    this.data.getProducts({categoryID: this.selectedCat},
      data => { this.dataSource.data = data; }
    );
  }

  removeProd(item) {
    this.data.removeProductbyIdOrCategory(item,
      data => {
        // console.log(data); this.getProducts();
      });
  }

  removeProdByCat() {
    this.errorHandler.openDialogPrompt(this.deleteConfirmation, (res) => {
      if (res) {
        this.data.removeProductbyIdOrCategory({categoryID: this.selectedCat},
          data => {
            this.getProducts();
            this.selectedCat = '';
          });
      }
    });
    // this.data.removeProductbyIdOrCategory({categoryID: this.selectedCat},
    //   data => { console.log(data); this.getProducts(); });
  }
  removeAllProd() {
    this.errorHandler.openDialogPrompt(this.deleteConfirmation, (res) => {
      if (res) {
        // this.data.removeAllProductbyCategory(data => { console.log(data); this.getProducts(); })
      }
    });
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
    console.log(product);
    if (product.prodClientQnt === 0) {
      this.basketArr = this.basketArr.filter(item => {
        return item._id !== product._id;
      });
      console.log(this.basketArr);
    } else if (!this.basketArr.find( item => {
      return item._id === product._id;
      }) ) {
      this.basketArr.push(product);
    } else {
      this.basketArr.forEach( item => {
         if (item._id === product._id) {
          item.prodClientQnt = product.prodClientQnt;
          // console.log(this.basketArr);
         }
      });
    }
    this.datashare.changeBasket(this.basketArr);
  }
}

const addProduct: any = [
  { field: 'product', value: '', placeholder: 'New Product', type: 'input' },
];
const addCategory: any = [
  { field: 'category', value: '', placeholder: 'New category name', type: 'input' },
];

const category: any = [
  { field: 'category', value: '', placeholder: 'Select category', type: 'select', selectors: [] },
];
