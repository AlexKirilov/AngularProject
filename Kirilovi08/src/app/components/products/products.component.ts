import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { Product } from '../../interfaces/product';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { DatashareService } from '../../services/datashare.service';

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
  public ifAdmin = true;
  public deleteConfirmation;

  prodName = '';
  prodSorts = '';
  prodDetails = '';

  displayedColumns = ['name', 'image', 'sort', 'price', 'quantity', 'details'];
  dataSource;
  constructor(
    private data: DatastoreService,
    private datashare: DatashareService,
    private errorHandler: HandleErrorsService
  ) {
    this.deleteConfirmation = {
      Type: 'prompt',
      ErrorMessage: `Are you sure that you wish to delete all records?`,
    };
  }

  getProducts() {
    this.data.getProducts('',
      data => {
        // Adding Client Qnt saver
        data.forEach(el => { el.prodClientQnt = 0; });
        this.products = data;
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
    this.data.addEditProducts(el, (data) => { console.log('Edit Product: ', data); } );
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
      data => { this.products = data; }
    );
  }

  removeProd(item) {
    this.data.removeProductbyIdOrCategory(item,
      data => { console.log(data); this.getProducts(); });
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
    product.prodClientQnt++;
    this.basket(product);
  }
  decrementQnt(product) {
    if (product.prodClientQnt > 0) {
      product.prodClientQnt--;
    }
    if (product.prodClientQnt === 0) {
      this.basket(product);
    }
  }

  basket(product) {
    if (product.prodClientQnt === 0) {
      const index = this.basketArr.indexOf(product, 0);
      this.basketArr.splice(index, 1);
    } else if (!this.basketArr.find( item => {
      return item === product;
      }) ) {
      this.basketArr.push(product);
    } else {
      this.basketArr.forEach( item => {
         if (item === product) {
          item.prodClientQnt = product.prodClientQnt;
          console.log(this.basketArr);
         }
      });
    }
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
