import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { DatashareService } from '../../../../services/datashare.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';
import { Unsubscribable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public warnMsg = '';
  public newPath: string;
  public login: FormGroup;
  public btnDisbaled = true;

  private unsLogin: Unsubscribable;
  private loginErrorMsg = 'Wrong email or password';

  constructor(
    private router: Router,
    private datastore: DatastoreService,
    public fb: FormBuilder,
  ) {
    this.login = fb.group({
      'email': ['', Validators.required],
      'pass': ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.datastore.token) {
      this.router.navigate(['/site']);
    }
  }

  ngOnDestroy(): void {
    if (this.unsLogin) { this.unsLogin.unsubscribe(); }
  }

  onchange() {
    this.btnDisbaled = !this.login.value.pass ||
                      !this.login.value.email ||
                      this.login.get('pass').invalid ||
                      this.login.get('email').invalid;
  }

  loginUser() {
    if (!this.btnDisbaled) {
      this.unsLogin = this.datastore.getLogedIn(
        { password: this.login.value.pass, email: this.login.value.email }
      ).subscribe(
        (result) => {
          this.datastore.setAuthorization(result);
          this.router.navigate(['/site']);
        },
        (err) => {
          // console.log('Log in error: ', err);
          this.warnMsg = this.loginErrorMsg;
        });
    }
  }
}
