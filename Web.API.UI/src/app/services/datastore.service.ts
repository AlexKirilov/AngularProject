import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


import { HandleErrorsService } from './handle-errors.service';
import { UserCreds, NewUser, Invoice, ContactsData } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersURI = 'api/users';  // URL to web api
  private url = `${environment.path}`;
  private config = {
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorHandler: HandleErrorsService,
  ) { }

  TOKEN_KEY = 'token';
  SITEDATA_KEY = 'SiteData';
  SITEID_KEY = 'WebSite';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get SiteData() {
    return localStorage.getItem(this.SITEDATA_KEY);
  }

  get WebSite() {
    return localStorage.getItem(this.SITEID_KEY);
  }

  setAuthorization(data) {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.SITEDATA_KEY, data.SiteData);
    localStorage.setItem(this.SITEID_KEY, data.WebSite);
  }

  removeAuthorization() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.SITEDATA_KEY);
    localStorage.removeItem(this.SITEID_KEY);
  }

  /////////////////////////////////////////
  //////////////// GET ////////////////////
  /////////////////////////////////////////

  // test(callback) {
  //   this.http.get<UserCreds[]>(`http://localhost:3000/test`).subscribe(data => { callback(data); });
  // }
  // getListOfUsers (callback) {
  //   this.http.get<UserCreds[]>(`${this.authURL}/users`).subscribe(
  //     data => { callback(data); },
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(this.errorType(err));
  //     }
  //   );
  // }


  // searchForExistingUserData ( property, value, callback ) {
  //   const uri = this.usersURI; // + '/?' + property + '=' + value;
  //   const dta = { email : value };
  //   this.http.post<UserCreds[]>(uri, dta, this.config).subscribe(
  //     data => { callback(data); },
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(this.errorType(err));
  //     }
  //   );
  // }

  // checkUser ( userdata, callback ) {
  //   const uri = this.usersURI + '/?username=' + userdata.username + '&password=' + userdata.password;
  //   this.http.get<UserCreds[]>(uri).subscribe(
  //     data => { callback(data); },
  //     (err: HttpErrorResponse) => {
  //       this.errorHandler.handleError(this.errorType(err));
  //     }
  //   );
  // }

  /////////////////////////////////////////
  ////////////// Auth

  getAuth(callback) {
    this.http.get<any>(`${this.url}/auth/getAuth`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  /////////////////////////////////////////
  ////////// Registration /////////////////
  /////////////////////////////////////////

  checkForExistingUserEmail (email, callback) {
    this.http.post<Boolean>(`${this.url}/auth/checkForUser`, email).subscribe(
      result => callback(result)
    );
  }

  registry(newUser, callback, errorcallback) {
    this.http.post<NewUser>(`${this.url}/auth/register`, newUser).subscribe(
      result => callback(result),
      err => errorcallback(err)
    );
  }

  editAuth(editUser, callback, errorcallback) {
    this.http.post<NewUser>(`${this.url}/auth/editAuth`, editUser).subscribe(
      result => callback(result),
      err => errorcallback(err)
    );
  }

  getLogedIn(checkUser, callback, errorcallback) {
    this.http.post<UserCreds>(`${this.url}/auth/login`, checkUser).subscribe(
      result => {
        this.setAuthorization(result);
        callback(result);
      },
      err => errorcallback(err)
    );
  }

  /////////////////////////////////////////
  ////////////// Auth Contacts

  getSiteContacts (callback) {
    this.http.get(`${this.url}/sitedata/getAuthSiteContacts`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err) // errorcallback(err)
    );
  }

  addOrEditSiteContacts(contacts, callback) {
    this.http.post(`${this.url}/sitedata/addOrEditSiteContacts`, contacts).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err) // errorcallback(err)
    );
  }

  removeSiteContacts () {

  }

  /////////////////////////////////////////
  ////////////// Invoices

  authInvoicesAll(callback) {
    this.http.get<Invoice>(`${this.url}/invoices/invoices`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }
  cusInvoiceDetails(callback) {
    this.http.get<Invoice>(`${this.url}/invoicecustomersdata/cusInvoiceDetails`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  addOrEditCusInvoiceDetails(invoice, callback) { // errorcallback
    this.http.post<Invoice>(`${this.url}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoice).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  removeCusInvoiceDetails () {

  }

  /////////////////////////////////////////
  ////////////// Customer

  getCustomer(callback) {
    this.http.get<ContactsData>(`${this.url}/customers/getCustomer`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  getAuthCustomer(callback) {
    this.http.get<ContactsData>(`${this.url}/authdata/getAuthCustomer`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  getAuthCustomers(callback) {
    this.http.get<ContactsData>(`${this.url}/authdata/getAuthCustomers`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  updateCustomerDiscount (data, callback) {
    this.http.post<any>(`${this.url}/authdata/cudiscount`, data).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  /////////////////////////////////////////
  ////////////// Employees

  getEmployees (callback) { // TODO:
    this.http.get<ContactsData>(`${this.url}/authdata/getEmployees`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  updateEmployee (data, callback ) {
    this.http.post<ContactsData>(`${this.url}/authdata/updateEmployee`, data).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }


  /////////////////////////////////////////
  ////////////// Orders

  getOrders (callback) {
    this.http.get<any>(`${this.url}/orders/getordersforapproval`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }


  /////////////////////////////////////////
  ///////////// Logs    ///////////////////
  /////////////////////////////////////////
  getLogsBySiteOwner (filters, callback) {
    this.http.post<any>(`${this.url}/logs/getSiteLogs`, filters).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }

  getLogsDateTypes (callback) {
    this.http.get<any>(`${this.url}/logs/logDataFilter`).subscribe(
      result => callback(result),
      err => this.errorHandler.handleError(err)
    );
  }


  /////////////////////////////////////////
  ///////////// Log OUT ///////////////////
  /////////////////////////////////////////
  logout() {
    this.removeAuthorization();
    this.router.navigate(['/login']);
  }

}
