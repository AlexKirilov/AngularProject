import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'api-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  // New 
  authInvoiceDetails = false;
  authContacts = false;
  GDPR = false;

  //Copied
  firstFormGroup: FormGroup;
  contactsDetails: FormGroup;
  invoiceDetails: FormGroup;
  isEditable: boolean = false; // Delete me



  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyCTRL: ['', Validators.required]
    });
    this.contactsDetails = this._formBuilder.group({
      phonesCtrl: [[], Validators.required],
      facebookCtrl: ['', Validators.required],
      twitterCtrl: ['', Validators.required],
      linkedinCtrl: ['', Validators.required],
      skypeCtrl: ['', Validators.required],
      latitudeCtrl: ['', Validators.required],
      longitudeCtrl: ['', Validators.required],
      urlCtrl: ['', Validators.required],
    });
    this.invoiceDetails = this._formBuilder.group({
      addressCtrl: ['', Validators.required],
      eikCtrl: ['', Validators.required],
      bulstatCtrl: ['', Validators.required],
      citizenshipCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
      townCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      countryPhoneCodeCtrl: ['', Validators.required],
      GDPRCtrl: [false, Validators.required], // We may not need this here
    });
  }
}
