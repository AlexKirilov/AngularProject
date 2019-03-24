import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Unsubscribable } from 'rxjs';
import { Product } from '../../interfaces/product';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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


  public displayedColumns = ['name', 'image', 'sort', 'details'];
  public dataSource = new MatTableDataSource<Product>([]);

  private unscData: Unsubscribable;
  private unscGetProducts: Unsubscribable;

  constructor(
    private titleService: Title,
    private datastore: DatastoreService,
    private datashare: DatashareService,
    private errorHandler: HandleErrorsService
  ) {
    this.titleService.setTitle('Products');
    this.datashare.changeCurrentPage('products');

    this.datashare.ifUser.subscribe(bool => { this.ifUser = bool; if (bool) { this.changeTableColumns(); } });
    this.datashare.ifAdmin.subscribe(bool => { this.ifAdmin = bool; if (bool) { this.changeTableColumns(); } });
    this.datashare.getBasket.subscribe(basket => this.basketArr = basket);
    this.deleteConfirmation = {
      Type: 'prompt',
      ErrorMessage: `Are you sure that you wish to delete all records?`,
    };
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.unscData) { this.unscData.unsubscribe(); }
    if (this.unscGetProducts) { this.unscGetProducts.unsubscribe(); }
  }

  ngAfterViewInit() {
    if (this.serverPagging) {
      this.sort.sortChange.subscribe(() => {
        this.getProducts();
      });
    }
  }

  changeTableColumns() {
    this.displayedColumns = ['name', 'image', 'sort', 'price', 'quantity'];
    if (this.ifUser && !this.ifAdmin) { this.displayedColumns.push('qnt'); }
    if (this.ifAdmin) { this.displayedColumns.push('controlers'); }
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
    this.unscGetProducts = this.datastore.getProducts({
      sortBy: this.sort,
      perPage: this.perPage,
      page: this.toPage
    }).subscribe(
      (data: any) => {
        // Adding Client Qnt saver
        data.results.forEach(el => {
          const tmp = this.basketArr.find(item => {
            return item._id === el._id;
          });
          el.prodClientQnt = (this.basketArr.length === 0) ? 0 : tmp ? tmp.prodClientQnt : 0;
        });
        console.log(data);
        this.dataSource.data = data.results;
        this.pageSizePag = data.perPage;
        this.lengthPag = data.rows;
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  // TODO: Uncompleted function
  getCategories() {
    this.datastore.getCategories(data => {
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

  saveProd(el: any) {
    this.editbtn = '';
    el.name = this.prodName;
    el.sort = this.prodSorts.split(',');
    el.sort = el.sort.filter(function (n) { return n !== undefined && n.trim() !== ''; });
    el.details = this.prodDetails;
    el.quantity = this.prodQuantity || 0;
    el.price = this.prodPrice || 0;
    el.pack = this.packageSize || '';
    el.imgURL = this.imageURL || '';
    this.datastore.addEditProducts(el).subscribe(
      (data) => {
        console.log(data);
        this.datashare.showSnackBar({ message: '"' + el.name + '" product was updated', action: 'successfully' });
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  addProd() {
    // TODO: Uncompleted function
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
          this.datastore.addEditProducts(tmp).subscribe(
            () => {
              this.getProducts();
              this.datashare.showSnackBar({
                message: 'Product was added',
                action: 'Successfully'
              });
            },
            (err: HttpErrorResponse) => {
              this.errorHandler.handleError(err);
            }
          );
        }
      }
    );
  }

  addCategory() {
    // TODO: Uncompleted function - Check me
    this.errorHandler.openDialogInputs({
      msg: 'Add new category',
      data: addCategory
    },
      res => {
        if (res) {
          this.unscData = this.datastore.addCategoryOrSubcategory({ 'name': res[0].value }).subscribe(
            () => {
              this.getCategories();
              this.datashare.showSnackBar({
                message: 'Category was added',
                action: 'Successfully'
              });
            },
            err => this.errorHandler.handleError(err)
          );
        }
      }
    );
  }

  showProtByCat() {
    this.datastore.getProducts({ categoryID: this.selectedCat }).subscribe(
      (data: any) => { this.dataSource.data = data; },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  removeProd(item: any) {
    this.datastore.removeProductbyIdOrCategory(item).subscribe(
      data => {
        this.getProducts();
        this.datashare.showSnackBar({ message: '"' + item.name + '" product was removed', action: 'successfully' });
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      });
  }

  removeProdByCat() {
    this.errorHandler.openDialogPrompt(this.deleteConfirmation, (res) => {
      if (res) {
        this.datastore.removeProductbyIdOrCategory({ categoryID: this.selectedCat }).subscribe(
          result => {
            this.getProducts();
            this.datashare.showSnackBar({ message: 'All Products were removed', action: 'successfully' });
            this.selectedCat = '';
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
      }
    });
  }

  removeAllProd() {
    // this.errorHandler.openDialogPrompt(this.deleteConfirmation, (res) => {
    //   if (res) {
    //     this.data.removeProductbyCustomer(data => {
    //       this.datashare.showSnackBar({ message: 'All Products were removed', action: 'successfully' });
    //       this.getProducts();
    //     });
    //   }
    // });
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
      this.basketArr = this.basketArr.filter(item => {
        return item._id !== product._id;
      });
    } else if (!this.basketArr.find(item => {
      return item._id === product._id;
    })) {
      this.basketArr.push(product);
    } else {
      this.basketArr.forEach(item => {
        if (item._id === product._id) {
          item.prodClientQnt = product.prodClientQnt;
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
