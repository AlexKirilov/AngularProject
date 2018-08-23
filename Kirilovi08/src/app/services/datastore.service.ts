import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HandleErrorsService } from './handle-errors.service';

import { NewUser } from '../interfaces/new-user';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';
import { retryWhen, catchError } from '../../../node_modules/rxjs/operators';
import { genericRetry } from './retry-functionality.service';
import { DatashareService } from './datashare.service';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private authURL = `${environment.path}`;
  private config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorHandler: HandleErrorsService,
    private datashare: DatashareService,
  ) { }

  TOKEN_KEY = 'token';
  SITEDATA_KEY = 'SiteData';
  SITEID_KEY = 'WebSite';
  USERNAME = 'username';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get SiteData() {
    return localStorage.getItem(this.SITEDATA_KEY);
  }

  get WebSite() {
    return localStorage.getItem(this.SITEID_KEY);
  }

  get Username() {
    return localStorage.getItem(this.USERNAME);
  }

  setAuthorization(data) {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.SITEDATA_KEY, data.SiteData);
    localStorage.setItem(this.SITEID_KEY, data.WebSite);
    localStorage.setItem(this.USERNAME, data.username);
  }

  removeAuthorization() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.SITEDATA_KEY);
    localStorage.removeItem(this.SITEID_KEY);
    localStorage.removeItem(this.USERNAME);
    this.datashare.showIfAdmin(false);
    this.datashare.showIfUser(false);
  }

  checkUser () {
    this.getProductEditLevel( res => {
      this.datashare.showIfAdmin(res === ((this.SiteData) ? this.SiteData.split(' ')[0] : null));
    });
  }

  /////////////////////////////////////////
  //////////     GET    ///////////////////
  /////////////////////////////////////////

  getLogedIn(checkUser, callback, errcallback) {
    this.http.post<User>(`${this.authURL}/customers/login`, checkUser)
    .subscribe(
      result => {
        console.log(result);
        this.setAuthorization(result);
        callback(result);
      },
      err => errcallback(err)
    );
  }

  getProductEditLevel (callback) {
    this.http.get(`${this.authURL}/store/geteditlevel`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getProducts(items, callback) {
    if (items === void 0) { items = ''; }
    if (items.sortBy.direction !== '') {
      items.sortBy = `${items.sortBy.active}${(items.sortBy.direction === 'desc') ? items.sortBy.direction : ''}` || {};
    } else {
      items.sortBy = '';
    }
    this.http.post<Product>(`${this.authURL}/store/products`, items).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getCategories(callback) {
    this.http.get<any>(`${this.authURL}/category/categories`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getSubCategories(parentId, callback) {
    // Example {"parentId":"5b0428384953411bd455bb90"}
    this.http.get<any>(`${this.authURL}/category/subcategories`, parentId).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getWebSiteData(callback) {
    this.http.get<any>(`${this.authURL}/sitedata/getsitecontacts`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getInvoices(invoices, callback) {
    // Need to be authorized
    // Default value {}
    // Can be searched by Country, Town, EIK, Bulstat, PostCode, Customer ID
    // { eik, town, bulstat, country, postcode, customerID }
    this.http.get<any>(`${this.authURL}/invoices/invoices`, invoices).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }


  getCustomerInvoices(callback) {
    // Only Customer can get
    this.http.get<any>(`${this.authURL}/invoicecustomersdata/cusInvoiceDetails`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  editCustomerInvoices(invoiceDetails, callback) {
    this.http.post<any>(`${this.authURL}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoiceDetails).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getGallery(callback) {
    this.http.get<any>(`${this.authURL}/gallery/get`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  checkForExistingUserEmail(email, callback) {
    this.http.post<Boolean>(`${this.authURL}/customers/checkForUser`, email).subscribe(
      result => callback(result)
    );
  }

  checkForExistingCategory(categoryName, callback) {
    // Required data { "name": "clothes"}
    this.http.get<any>(`${this.authURL}/sitedata/checkForExistingCategory`, categoryName).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /////////////////////////////////////////
  ////////////// Customer
  getClientData(callback) {
    this.http.get<any>(`${this.authURL}/customers/getCustomer`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  editClientData(data, callback) {
    this.http.post<any>(`${this.authURL}/customers/editcustomer`, data).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getOrders(callback) {
    this.http.get<any>(`${this.authURL}/orders/getorders`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  addOrder(order, callback) {
    this.http.post<any>(`${this.authURL}/orders/addOrder`, order).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }


  /////////////////////////////////////////
  ////////// POST / PUT ///////////////////
  /////////////////////////////////////////

  addEditProducts(product, callback) {
    this.http.post<Product>(`${this.authURL}/store/createproduct`, product).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }
  // addEditProducts(product, callback) {
  //   this.http.post<Product>(`${this.authURL}/store/editproduct`, product).subscribe(
  //     result => callback(result),
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(err);
  //     }
  //   );
  // }

  registry(newUser, callback, errcallback) {
    this.http.post<NewUser>(`${this.authURL}/customers/register`, newUser).subscribe(
      result => callback(result),
      err => errcallback(err)
    );
  }

  // TODO: Change here // Check the API BE
  editCustomer(newUser, callback, errcallback) {
    // As minimum required data for this call -> { "password":"password", "email": "mail@mail.com" } to be available
    this.http.post<NewUser>(`${this.authURL}/customers/editcustomer`, newUser).subscribe(
      result => callback(result),
      err => errcallback(err)
    );
  }

  // TODO: Change here // Check the API BE
  addCategoryOrSubcategory(category, callback) {
    // Required data { "name": "bmw", "parentId":"5b05149b8d9e8024cc528527"} for v2 will be included and "type":"5b0428384953411bd455bb90"
    this.http.post<any>(`${this.authURL}/category/createcategory`, category).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  addOrEditInvoice(callback) {
    // Requires data --> By Customer/Employee (level CU or EE) If edit need  {invoiceID}
    // Requires data --> By Admin or Manager or Employee { customerID } If Edit need {invoiceID}
    this.http.get<any>(`${this.authURL}/invoices/addOrEditInvoice`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }


  addOrEditCustomerInvoiceDetails(invoiceData, callback) {
    // Required Data {GDPR == true}
    // Only Customer can update or create Invoice Data
    this.http.get<any>(`${this.authURL}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoiceData).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  addToGallery(images, callback) {
    this.http.post<any>(`${this.authURL}/gallery/add`, images).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /////////////////////////////////////////
  ////////////// DELETE ///////////////////
  /////////////////////////////////////////

  removeCustomer(customer, callback) {
    // DELETE Customer can delete his account no additional data needed {}
    // DELETE fCrom Admin or Manager by CustomersID or ustomers Email required data {customerID or email}
    this.http.post<Product>(`${this.authURL}/store/deletecustomer`, customer).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  removeProductbyIdOrCategory(productid, callback) {
    this.http.post<Product>(`${this.authURL}/store/removeproducts`, productid).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  removeProductbyCustomer(callback) {
    this.http.post<Product>(`${this.authURL}/store/removeAllproductsByCustomer`, '').subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  // removeAllProductbyCategory(cat, callback) { // For future development
  //   this.http.post<Product>(`${this.authURL}/store/removeAllproductsByCustomer`, cat).subscribe(
  //     result => callback(result),
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(err);
  //     }
  //   );
  // }

  removeInvoices(removeInvoice, callback) {
    // Required Data { all: boolean, cutomerID or/and InvoiceID }
    this.http.get<any>(`${this.authURL}/invoices/removeinvoices`, removeInvoice).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  removeCustomerInvoiceDetails(callback) {
    // Only customers can remove this data
    this.http.get<any>(`${this.authURL}/invoicecustomersdata/removeCusInvoiceDetails`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /////////////////////////////////////////
  ///////////// Log OUT ///////////////////
  /////////////////////////////////////////
  logout() {
    if (this.Username === null) {
      this.router.navigate(['/login']);
    } else {
      this.removeAuthorization();
    }
  }

}
