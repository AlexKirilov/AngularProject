import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastoreService } from '../../../services/datastore.service';

@Component({
  selector: 'app-login',
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
    private router: Router,
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
      this.router.navigate(['/home']);
  }

  onchange() {
    this.btnDisbaled = !this.login.value.pass || !this.login.value.email || this.login.get('pass').invalid || this.login.get('email').invalid
  }


  loginUser() {
    if (!this.btnDisbaled) {
      this.datastore.getLogedIn({ password: this.login.value.pass, email: this.login.value.email },
        (res) => {
          this.router.navigate(['/home']);
        },
        (err) => {
          // console.log('Log in error: ', err);
          this.warnMsg = this.loginErrorMsg
        });
    }
  }
}
