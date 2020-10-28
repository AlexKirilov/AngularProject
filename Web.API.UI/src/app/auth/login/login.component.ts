import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unsubscribable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { take } from 'rxjs/operators';

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
  public userAuth = false;
  public btnDisbaled = true;

  private unsLogin: Unsubscribable;
  private loginErrorMsg = 'Wrong email or password';

  constructor(
    private router: Router,
    private titleService: Title,
    private datastore: DatastoreService,
    private datashare: DatashareService,
    public fb: FormBuilder,
  ) {
    this.titleService.setTitle('Login');

    this.login = fb.group({
      'email': ['', Validators.required, Validators.email],
      'pass': ['', Validators.required],
    });

    this.datashare.changeCurrentPage('login');
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
      this.userAuth = true;
      this.unsLogin = this.datastore.getLogedIn(
        { password: this.login.value.pass, email: this.login.value.email }
      ).pipe(take(1)).subscribe(
        (result) => {
          this.userAuth = false;
          this.datastore.setAuthorization(result);
          this.router.navigate(['/site']);
        },
        (err) => {
          this.userAuth = false;
          this.warnMsg = this.loginErrorMsg;
        });
    }
  }
}
