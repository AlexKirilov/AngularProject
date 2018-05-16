import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'api-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('reg-dashboard');
  }

}
