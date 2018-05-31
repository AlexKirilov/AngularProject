import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { DatashareService } from '../../../../services/datashare.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';

@Component({
  selector: 'api-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public warnMsg = '';
  public newPath: string;
  private loginErrorMsg = 'Wrong email or password';

  public login: FormGroup;
  public btnDisbaled = true;

  constructor(
    private userService: UsersService,
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService,
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
    if (this.datastore.token)
      this.router.navigate(['/dashboard']);
  }

  onchange() {
    this.btnDisbaled = !this.login.value.pass || !this.login.value.email || this.login.get('pass').invalid || this.login.get('email').invalid
  }

  test() {
    this.datastore.test(res => {
      console.log(res)
    });


  }
  loginUser() {
    if (!this.btnDisbaled) {
      this.datastore.getLogedIn({ password: this.login.value.pass, email: this.login.value.email },
        (res) => {
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          // console.log('Log in error: ', err);
          this.warnMsg = this.loginErrorMsg
        });
    }
  }
}
