import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NewUser } from '../../app.model';
import { DatashareService } from '../../services/datashare.service';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';

@Component({
  selector: 'api-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {

  public signin: FormGroup;
  public btnSubmitValidation = false;
  public passNotMatch = false;
  public emailNotValid = false;
  public emailIsTaken = false;

  public userData: NewUser = {
    siteName: null,
    password: null,
    firstname: null,
    lastname: null,
    email: null
  };

  public repassword: string;
  public required = true;
  public barLabel = '';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public wrongCreds;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private titleService: Title,
    private datastore: DatastoreService,
    private datashare: DatashareService,
    private errorHandler: HandleErrorsService
    ) {
    this.titleService.setTitle('Sign In');
    this.datashare.changeCurrentPage('signin');

    this.signin = fb.group({
      sitename: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.datastore.token) {
      this.router.navigate(['/site']);
    }
    this.wrongCreds = document.getElementById('login-error-msg');
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
      this.datastore.checkForExistingUserEmail({email: this.signin.value.email}).pipe(take(1))
      .subscribe(
        (res: any) => {
        this.emailIsTaken = res.exist;
       }, err => this.errorHandler.handleError(err));
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
    // tslint:disable-next-line:max-line-length
    // this.btnSubmitValidation = this.signin.value.username !== '' && this.signin.value.email !== '' && this.signin.value.fname !== '' && this.signin.value.lname !== '' && this.signin.value.password !== '';
    // tslint:disable-next-line:max-line-length
    this.btnSubmitValidation = this.signin.value.email !== '' && this.signin.value.fname !== '' && this.signin.value.lname !== '' && this.signin.value.password !== '';
  }

  validate() {
    return this.checkpass() && this.emailValidation();
  }

  regNewCustmer(event) {
    if (this.validate()) {
      this.userData.siteName = this.signin.value.sitename;
      this.userData.firstname = this.signin.value.fname;
      this.userData.lastname = this.signin.value.lname;
      this.userData.email = this.signin.value.email;
      this.userData.password = this.signin.value.password;
      
      this.datastore.registry(this.userData).pipe(take(1)).subscribe(res => {
        this.datastore.setAuthorization(res);
        this.router.navigate(['/registrationdetails']);
      }, err => console.log('Err: ', err));
    }
  }
}
