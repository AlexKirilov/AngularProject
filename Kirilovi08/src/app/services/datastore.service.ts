import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HandleErrorsService } from './handle-errors.service';

import { NewUser } from '../interfaces/new-user';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';
import { DatashareService } from './datashare.service';
import { Unsubscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private authURL = `${environment.path}`;

  private unscProd: Unsubscribable;
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

  checkUser() {
    this.unscProd = this.getProductEditLevel().subscribe(
      res => {
        this.datashare.showIfAdmin(res === ((this.SiteData) ? this.SiteData.split(' ')[0] : null));
        this.unscProd.unsubscribe();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /////////////////////////////////////////
  ////////// Forgot Pass //////////////////
  /////////////////////////////////////////

  forgotPass(data: object) {
    return this.http.post<any>(`${this.authURL}/auth/forgotpass`, data);
  }

  resetPass(newData: any) {
    return this.http.post<any>(`${this.authURL}/auth/resetpass`, newData);
  }

  /////////////////////////////////////////
  //////////     GET    ///////////////////
  /////////////////////////////////////////

  getLogedIn(checkUser: any) {
    return this.http.post<User>(`${this.authURL}/customers/login`, checkUser);
  }

  getProductEditLevel() {
    return this.http.get(`${this.authURL}/store/geteditlevel`);
  }

  getProducts(items: any) {
    if (items === void 0) { items = ''; }
    if (items.sortBy.direction !== '') {
      items.sortBy = `${items.sortBy.active}${(items.sortBy.direction === 'desc') ? items.sortBy.direction : ''}` || {};
    } else {
      items.sortBy = '';
    }
    return this.http.post<Product>(`${this.authURL}/store/products`, items);
  }

  // TODO: unused
  getCategories(callback) {
    this.http.get<any>(`${this.authURL}/category/categories`).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }
  // TODO: unused
  getSubCategories(parentId, callback) {
    // Example {"parentId":"5b0428384953411bd455bb90"}
    this.http.get<any>(`${this.authURL}/category/subcategories`, parentId).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getWebSiteData() {
    return this.http.get<any>(`${this.authURL}/sitedata/getsitecontacts`);
  }

  // TODO: unused
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


  getCustomerInvoices() {
    // Only Customer can get
    return this.http.get<any>(`${this.authURL}/invoicecustomersdata/cusInvoiceDetails`);
  }

  editCustomerInvoices(invoiceDetails: any) {
    return this.http.post<any>(`${this.authURL}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoiceDetails);
  }

  getGallery() {
    return this.http.get<any>(`${this.authURL}/gallery/get`);
  }

  checkForExistingUserEmail(email: any) {
    return this.http.post<Boolean>(`${this.authURL}/customers/checkForUser`, email);
  }

  // TODO: unused
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
  getClientData() {
    return this.http.get<any>(`${this.authURL}/customers/getCustomer`);
  }

  editClientData(data: any) {
    return this.http.post<any>(`${this.authURL}/customers/editcustomer`, data);
  }

  getOrders() {
    return this.http.get<any>(`${this.authURL}/orders/getorders`);
  }

  getOrdersToConfirm() {
    return this.http.get<any>(`${this.authURL}/orders/getordersforapproval`);
  }

  addOrder(order: any) {
    return this.http.post<any>(`${this.authURL}/orders/addOrder`, order);
  }

  editOrder(order: any) {
    return this.http.post<any>(`${this.authURL}/orders/editOrder`, order);
  }

  getCustomerAddress(clientId: any) {
    return this.http.get<any>(`${this.authURL}/customers/getCustomerAddress`, clientId);
  }

  /////////////////////////////////////////
  ////////// POST / PUT ///////////////////
  /////////////////////////////////////////

  addEditProducts(product: any) {
    return this.http.post<Product>(`${this.authURL}/store/createproduct`, product);
  }

  registry(newUser: any) {
    return this.http.post<NewUser>(`${this.authURL}/customers/register`, newUser);
  }

  // TODO: unused
  // TODO: Change here // Check the API BE
  editCustomer(newUser: any) {
    // As minimum required data for this call -> { "password":"password", "email": "mail@mail.com" } to be available
    return this.http.post<NewUser>(`${this.authURL}/customers/editcustomer`, newUser);
  }

  // TODO: Change here // Check the API BE
  addCategoryOrSubcategory(category: any) {
    // Required data { "name": "bmw", "parentId":"5b05149b8d9e8024cc528527"} for v2 will be included and "type":"5b0428384953411bd455bb90"
    return this.http.post<any>(`${this.authURL}/category/createcategory`, category);
  }
  // TODO: unused
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

  // TODO: unused
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

  addToGallery(images: any) {
    return this.http.post<any>(`${this.authURL}/gallery/add`, images);
  }

  getAllOrders(filters: any) {
    return this.http.get<any>(`${this.authURL}/orders/getorders${filters}`);
  }

  /////////////////////////////////////////
  ////////////// DELETE ///////////////////
  /////////////////////////////////////////
  // TODO: unused
  removeCustomer(customer, callback) {
    // DELETE Customer can delete his account no additional data needed {}
    // DELETE from Admin or Manager by CustomersID or customers Email required data {customerID or email}
    this.http.post<Product>(`${this.authURL}/store/deletecustomer`, customer).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  // Return the productId or {categoryID: this.selectedCat}
  removeProductbyIdOrCategory(productid: any) {
    return this.http.delete<Product>(`${this.authURL}/store/removeproducts`, productid);
  }

  // removeProductbyCustomer(callback) {
  //   this.http.post<Product>(`${this.authURL}/store/removeAllproductsByCustomer`, '').subscribe(
  //     result => callback(result),
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(err);
  //     }
  //   );
  // }

  // removeAllProductbyCategory(cat, callback) {
  //   this.http.post<Product>(`${this.authURL}/store/removeAllProductByCategory`, cat).subscribe(
  //     result => callback(result),
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(err);
  //     }
  //   );
  // }

  // TODO: unused
  removeInvoices(removeInvoice, callback) {
    // Required Data { all: boolean, cutomerID or/and InvoiceID }
    this.http.get<any>(`${this.authURL}/invoices/removeinvoices`, removeInvoice).subscribe(
      result => callback(result),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  // TODO: unused
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
      this.router.navigate(['/products']);
    }
  }

}
