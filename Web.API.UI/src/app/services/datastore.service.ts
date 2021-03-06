import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { UserCreds, NewUser, Invoice, ContactsData } from '../app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private url = `${environment.path}`;

  constructor(
    private router: Router,
    private http: HttpClient,
    // private errorHandler: HandleErrorsService,
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


  /////////////////////////////////////////
  ////////////// Auth

  getAuth() {
    return this.http.get<any>(`${this.url}/auth/getAuth`);
  }

  /////////////////////////////////////////
  ////////// Registration /////////////////
  /////////////////////////////////////////

  checkForExistingUserEmail(email: any) {
    return this.http.post<Boolean>(`${this.url}/auth/checkForUser`, email);
  }

  registry(newUser: any) {
    return this.http.post<NewUser>(`${this.url}/auth/register`, newUser);
  }

  editAuth(editUser: any) {
    return this.http.post<NewUser>(`${this.url}/auth/editAuth`, editUser);
  }

  getLogedIn(checkUser: any) {
    return this.http.post<UserCreds>(`${this.url}/auth/login`, checkUser);
  }

  getSiteID() {
    return this.http.get<any>(`${this.url}/auth/clientSiteID`);
  }

  /////////////////////////////////////////
  ////////// Forgot Pass //////////////////
  /////////////////////////////////////////

  forgotPass(data: object) {
    return this.http.post<any>(`${this.url}/auth/forgotpass`, data);
  }

  resetPass(newData: any) {
    return this.http.post<any>(`${this.url}/auth/resetpass`, newData);
  }

  /////////////////////////////////////////
  ///////////// Orders ////////////////////
  /////////////////////////////////////////

  getAllOrders(filters: any) {
    return this.http.get<any>(`${this.url}/orders/getorders${filters}`);
  }

  editOrder(order: any) {
    return this.http.post<any>(`${this.url}/orders/editOrder`, order);
  }


  /////////////////////////////////////////
  ////////////// Auth Contacts

  getSiteContacts() {
    return this.http.get(`${this.url}/sitedata/getAuthSiteContacts`);
  }

  addOrEditSiteContacts(contacts: any) {
    return this.http.post(`${this.url}/sitedata/addOrEditSiteContacts`, contacts);
  }

  /////////////////////////////////////////
  ////////////// Invoices

  authInvoicesAll() {
    return this.http.get<Invoice>(`${this.url}/invoices/invoices`);
  }

  cusInvoiceDetails() {
    return this.http.get<Invoice>(`${this.url}/invoicecustomersdata/cusInvoiceDetails`);
  }

  addOrEditCusInvoiceDetails(invoice: any) { // errorcallback
    return this.http.post<Invoice>(`${this.url}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoice);
  }

  // TODO: remove or set
  removeCusInvoiceDetails() {

  }

  /////////////////////////////////////////
  ////////////// Customer

  // TODO: Unused function;
  getCustomer() {
    return this.http.get<ContactsData>(`${this.url}/customers/getCustomer`);
  }

  // TODO: Unused function;
  getAuthCustomer() {
    return this.http.get<ContactsData>(`${this.url}/authdata/getAuthCustomer`);
  }

  getCustomerAddress(user: any) {
    return this.http.get<ContactsData>(`${this.url}/customers/getCustomerAddress`, user);
  }

  getAuthCustomers(): Observable<ContactsData[]> {
    return this.http.get<ContactsData[]>(`${this.url}/authdata/getAuthCustomers`);
  }

  updateCustomerDiscount(data: any) {
    return this.http.post<any>(`${this.url}/authdata/cudiscount`, data);
  }
  

  /////////////////////////////////////////
  ////////////// Employees

  getEmployees() {
    return this.http.get<ContactsData>(`${this.url}/authdata/getEmployees`);
  }

  updateEmployee(data: any) {
    return this.http.post<ContactsData>(`${this.url}/authdata/updateEmployee`, data);
  }


  /////////////////////////////////////////
  ////////////// Orders

  // TODO: Unused function;
  getOrders() {
    return this.http.get<any>(`${this.url}/orders/getordersforapproval`);
  }


  /////////////////////////////////////////
  ///////////// Logs    ///////////////////
  /////////////////////////////////////////
  getLogsBySiteOwner(filters: any) {
    return this.http.post<any>(`${this.url}/logs/getSiteLogs`, filters);
  }

  getLogsDateTypes() {
    return this.http.get<any>(`${this.url}/logs/logDataFilter`);
  }

  clearLogs() {
    return this.http.delete<any>(`${this.url}/logs/`);
  }

  /////////////////////////////////////////
  ///////////// Dashboard    //////////////
  /////////////////////////////////////////

  getSalesChartData(days: any) {
    return this.http.post<any>(`${this.url}/dashboard/sales`, { days });
  }

  getProductsChartData() {
    return this.http.get<any>(`${this.url}/dashboard/products`);
  }

  getSalesTopBottomList() {
    return this.http.get<any>(`${this.url}/dashboard/saleslist`);
  }

  getOrdersStatistics() {
    return this.http.get<any>(`${this.url}/dashboard/orders`);
  }

  /////////////////////////////////////////
  ///////////// Log OUT ///////////////////
  /////////////////////////////////////////
  logout() {
    this.removeAuthorization();
    this.router.navigate(['/auth/login']);
  }


}
