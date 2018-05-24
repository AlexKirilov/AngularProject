import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatastoreService } from '../../../services/datastore.service';
import { Router } from '@angular/router';
import { NewUser } from '../../../interfaces/new-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {



  public signin: FormGroup;
  public btnSubmitValidation = false;
  public passNotMatch = false;
  public emailNotValid = false;
  public emailIsTaken = false;


  public userData: NewUser = {
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    email: null,
    // secretPIN: null
  };

  public repassword: string;
  public required = true;
  public barLabel = '';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public wrongCreds;

  private errormessages = {
    password: 'Passwords doesn`t match!',
    username: 'This username is already taken!',
    emailExists: 'This email is already used',
    emailValidation: 'This email is not in right form!',
  };
  private emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  private isUserNameTaken: boolean;

  constructor(
    private router: Router,
    private datastore: DatastoreService,
    public fb: FormBuilder,
  ) {
    this.signin = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'repassword': ['', Validators.required],
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'email': ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.datastore.token)
      this.router.navigate(['/home']);
    this.wrongCreds = document.getElementById('login-error-msg');
  }


  emailValidation() {
    if (this.signin.value.email.trim() != '') {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var tmp = re.test(this.signin.value.email);
      this.emailNotValid = !tmp
      if (tmp) {
        this.checkingForExistingEmail();
        this.validUserData();
      }
      return tmp;
    } else {
      this.emailNotValid = false
    }
  }

  checkingForExistingEmail() {
    if (this.signin.value.email.trim() != '') {
      this.datastore.checkForExistingUserEmail({ email: this.signin.value.email },
        (res) => { 
          this.emailIsTaken = res.exist; }
      );
    }
  }

  checkpass() {
    if (this.signin.value.password != '' && this.signin.value.repassword != '') {
      let tmp = this.signin.value.password === this.signin.value.repassword;
      this.passNotMatch = !tmp;
      this.validUserData();
      return tmp;
    }
  }

  validUserData() {
    this.btnSubmitValidation = this.signin.value.username !== '' && this.signin.value.email !== '' && this.signin.value.fname !== '' && this.signin.value.lname !== '' && this.signin.value.password !== ''
  }

  validate() {
    return this.checkpass() && this.emailValidation()
  }

  regNewCustmer(event) {
    if (this.validate()) {
      this.userData.username = this.signin.value.username;
      this.userData.firstname = this.signin.value.fname;
      this.userData.lastname = this.signin.value.lname;
      this.userData.email = this.signin.value.email;
      this.userData.password = this.signin.value.password;
      this.datastore.registry(this.userData,
        (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        (err) => console.log('Err: ', err));
    }
  }

}
