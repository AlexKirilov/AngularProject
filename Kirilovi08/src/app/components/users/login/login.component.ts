import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastoreService } from '../../../services/datastore.service';
import { DatashareService } from '../../../services/datashare.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public warnMsg = '';
  public newPath: string;
  private loginErrorMsg = 'Wrong email or password';

  public login: FormGroup;
  public btnDisbaled = true;

  private unscLogin: Unsubscribable;

  constructor(
    private router: Router,
    private datastore: DatastoreService,
    private datashare: DatashareService,
    public fb: FormBuilder,
  ) {
    this.login = fb.group({
      'email': ['', Validators.required],
      'pass': ['', Validators.required],
    });

    // this.datashare.newPath.subscribe(path => {
    //   if(path !== '') this.newPath = path;
    //   else this.newPath = '/home'
    // });
  }

  ngOnInit() {
    if (this.datastore.token) {
      this.router.navigate(['/products']);
    }
  }

  ngOnDestroy(): void {
    if (this.unscLogin) { this.unscLogin.unsubscribe(); }
  }

  onchange() {
    // tslint:disable-next-line:max-line-length
    this.btnDisbaled = !this.login.value.pass || !this.login.value.email ||
      this.login.get('pass').invalid || this.login.get('email').invalid;
  }

  loginUser() {
    if (!this.btnDisbaled) {
      this.unscLogin = this.datastore.getLogedIn({ password: this.login.value.pass, email: this.login.value.email })
        .subscribe(
          (res) => {
            this.datastore.setAuthorization(res);
            this.datastore.checkUser();
            this.datashare.showIfUser(true);
            this.router.navigate(['/products']);
          },
          (err) => {
            this.warnMsg = this.loginErrorMsg;
          }
        );
    }
  }
}
