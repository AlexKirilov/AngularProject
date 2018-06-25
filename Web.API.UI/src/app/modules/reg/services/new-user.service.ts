import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NewUser } from '../../../app.model';


import { HandleErrorsService } from '../../../services/handle-errors.service';
import { DatastoreService } from '../../../services/datastore.service';

@Injectable()
export class NewUserService {

  constructor(
    private newuser: NewUser,
    private router: Router, private http: Http,
    private errorHandler: HandleErrorsService,
    private datastore: DatastoreService
  ) { }

  createUser () {

  }
}
