import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


import { HandleErrorsService } from './handle-errors.service';
import { UserCreds, NewUser } from '../app.model';

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

  getLogedIn(checkUser, callback, errorcallback) {
    this.http.post<UserCreds>(`${this.url}/auth/login`, checkUser).subscribe(
      result => {
        this.setAuthorization(result);
        callback(result);
      },
      err => errorcallback(err)
    );
  }


  getsitecontacts () {

  }

  addOrEditSiteContacts(contacts, callback, errorcallback) {
    this.http.post(`${this.url}/sitedata/addOrEditSiteContacts`, contacts).subscribe(
      result => callback(result),
      err => errorcallback(err)
    );
  }

  removeSiteContacts () {

  }

  /////////////////////////////////////////
  ////////////// Invoices

  cusInvoiceDetails() {

  }

  addOrEditCusInvoiceDetails(invoice, callback, errorcallback) {
    this.http.post(`${this.url}/invoicecustomersdata/addOrEditCusInvoiceDetails`, invoice).subscribe(
      result => callback(result),
      err => errorcallback(err)
    );
  }

  removeCusInvoiceDetails () {

  }

  /////////////////////////////////////////
  ///////////// Log OUT ///////////////////
  /////////////////////////////////////////
  logout() {
    this.removeAuthorization();
    this.router.navigate(['/login']);
  }

}
