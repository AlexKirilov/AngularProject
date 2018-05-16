import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { UserCreds } from '../../../interfaces/user';

import { HandleErrorsService } from '../../../services/handle-errors.service';
import { DatastoreService } from '../../../services/datastore.service';
import { DatashareService } from '../../../services/datashare.service';

@Injectable()
export class UsersService {

  private users: UserCreds [];

  constructor (
    private router: Router,
    private http: Http,
    private errorHandler: HandleErrorsService,
    private datastore: DatastoreService,
    private datashare: DatashareService
  ) { }

  // getAllUsers(callback) {
  //   this.datastore.getListOfUsers (
  //     data => {
  //       this.users = data;
  //       callback(data);
  //     }
  //   );
  // }

  // findUser(username, callback) {
  //   this.datastore.checkUser (
  //     username,
  //     data => {
  //       this.users = data;
  //       this.getUserLoggedIn(data);
  //       callback( (data.length > 0) ? true : false );
  //     }
  //   );
  // }

  // getUserLoggedIn (data) {
  //   if (data.length > 0) {
  //     this.datashare.changeCurrentUser(data[0]);
  //     localStorage.setItem('currentUser', JSON.stringify( data[0].username ));
  //   }
  // }

  // searchForExistingUserData(propertie, value, callback) {
  //   this.datastore.searchForExistingUserData (
  //     propertie,
  //     value,
  //     data => {
  //       this.users = data;
  //       callback( (data.length > 0) ? true : false );
  //     }
  //   );
  // }

  // logOutUser() {
  //   localStorage.removeItem('currentUser');
  //   this.datashare.changeCurrentUser({ username: null, token: null});
  //   this.router.navigate(['/']);
  // }

}
