import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Headers } from '@angular/http';
import { Observable ,  of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'


import { HandleErrorsService } from './handle-errors.service';
import { UserCreds } from '../interfaces/user';
import { Options } from 'selenium-webdriver';
import { NewUser } from '../interfaces/new-user';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersURI = 'api/users';  // URL to web api
  private authURL = `${environment.path}/auth`
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
  ////////// POST / PUT ///////////////////
  /////////////////////////////////////////

  test(callback) {
    this.http.post<any>(`http://localhost:3000/store/createproduct`, { name: 'names'}).subscribe(
      result => callback(result)
    );
  }
  checkForExistingUserEmail (email, callback) {
    this.http.post<Boolean>(`${this.authURL}/checkForUser`, email).subscribe(
      result => callback(result)
    );
  }

  registry(newUser, callback, errcallback) {
    this.http.post<NewUser>(`${this.authURL}/register`, newUser).subscribe(
      result => callback(result),
      err => errcallback(err)
    )
  }

  getLogedIn(checkUser, callback, errcallback) {
    this.http.post<UserCreds>(`${this.authURL}/login`, checkUser).subscribe(
      result => {
        this.setAuthorization(result);
        callback(result)
      },
      err => errcallback(err)
    )
  }


  /////////////////////////////////////////
  ///////////// Log OUT ///////////////////
  /////////////////////////////////////////
  logout() {
    this.removeAuthorization();
    this.router.navigate(['/login']);
  }

}