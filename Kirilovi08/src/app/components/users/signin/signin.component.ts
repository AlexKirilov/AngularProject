import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatastoreService } from '../../../services/datastore.service';
import { Router } from '@angular/router';
import { NewUser } from '../../../interfaces/new-user';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {



  public signin: FormGroup;
  public btnSubmitValidation = false;
  public passNotMatch = false;
  public emailNotValid = false;
  public emailIsTaken = false;


  public userData: NewUser = {

    password: null,
    firstname: null,
    lastname: null,
    email: null,
    // secretPIN: null
    // username: null,
  };

  public repassword: string;
  public required = true;
  public barLabel = '';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public wrongCreds;

  private errormessages = {
    password: 'Passwords doesn`t match!',
    // username: 'This username is already taken!',
    emailExists: 'This email is already used',
    emailValidation: 'This email is not in right form!',
  };
  private emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  private isUserNameTaken: boolean;

  private unscCheckEmail: Unsubscribable;
  constructor(
    private router: Router,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
    public fb: FormBuilder,
  ) {
    this.signin = fb.group({
      // 'username': ['', Validators.required],
      'password': ['', Validators.required],
      'repassword': ['', Validators.required],
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'email': ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.datastore.token) {
      this.router.navigate(['/products']);
    }
    this.wrongCreds = document.getElementById('login-error-msg');
  }

  ngOnDestroy(): void {
    if (this.unscCheckEmail) { this.unscCheckEmail.unsubscribe(); }
  }

  emailValidation() {
    if (this.signin.value.email.trim() !== '') {
      // tslint:disable-next-line:max-line-length
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const tmp = re.test(this.signin.value.email);
      this.emailNotValid = !tmp;
      if (tmp) {
        this.checkingForExistingEmail();
        this.validUserData();
      }
      return tmp;
    } else {
      this.emailNotValid = false;
    }
  }

  checkingForExistingEmail() {
    if (this.signin.value.email.trim() !== '') {
      this.unscCheckEmail = this.datastore.checkForExistingUserEmail({ email: this.signin.value.email }).subscribe(
        (res: any) => {
          this.emailIsTaken = res.exist;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }

      );
    }
  }

  checkpass() {
    if (this.signin.value.password !== '' && this.signin.value.repassword !== '') {
      const tmp = this.signin.value.password === this.signin.value.repassword;
      this.passNotMatch = !tmp;
      this.validUserData();
      return tmp;
    }
  }

  validUserData() {
    this.btnSubmitValidation =
      // this.signin.value.username !== '' &&
      this.signin.value.email !== '' &&
      this.signin.value.fname !== '' && this.signin.value.lname !== '' && this.signin.value.password !== '';
  }

  validate() {
    return this.checkpass() && this.emailValidation();
  }

  regNewCustmer(event: any) {
    if (this.validate()) {
      // this.userData.username = this.signin.value.username;
      this.userData.firstname = this.signin.value.fname;
      this.userData.lastname = this.signin.value.lname;
      this.userData.email = this.signin.value.email;
      this.userData.password = this.signin.value.password;
      this.datastore.registry(this.userData).subscribe(
        (res) => {
          // localStorage.setItem('token', res.token);
          this.router.navigate(['/login']);
        },
        (err) => console.log('Err: ', err)
      );
    }
  }

}
