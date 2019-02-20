import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  // New
  authInvoiceDetails = false;
  authContacts = false;
  GDPR = false;

  // Copied
  firstFormGroup: FormGroup;
  contactsDetails: FormGroup;
  invoiceDetails: FormGroup;
  isEditable = false; // Delete me



  constructor(
    private _formBuilder: FormBuilder,
    private datastore: DatastoreService
  ) { }

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
      postcodeCtrl: ['', Validators.required],
      countryPhoneCodeCtrl: ['', Validators.required],
      GDPRCtrl: [false, Validators.required], // We may not need this here
    });
  }

  SaveData () {
    console.log(this.GDPR);
    console.log(this.contactsDetails);
    console.log(this.invoiceDetails);

    if (this.GDPR && this.authContacts) {
      const tmpContacts = {
        phones: this.contactsDetails.value.phonesCtrl.split(',').filter(v => v !== ''),
        connections: {
          facebook: this.contactsDetails.value.facebookCtrl,
          twitter: this.contactsDetails.value.twitterCtrl,
          linkedin: this.contactsDetails.value.linkedinCtrl,
          skype: this.contactsDetails.value.skypeCtrl
        },
        coordinates: {
          latitude: this.contactsDetails.value.latitudeCtrl,
          longitude: this.contactsDetails.value.longitudeCtrl,
          url: this.contactsDetails.value.urlCtrl
        }
      };

      this.datastore.addOrEditSiteContacts(
        tmpContacts,
        (data) => console.log(data)
        // (err) => console.log(err)
      );
      console.log(tmpContacts);
    }
    if (this.GDPR && this.authInvoiceDetails) {
      const tmpInvoice = {
        address: this.invoiceDetails.value.addressCtrl,
        eik: this.invoiceDetails.value.eikCtrl,
        bulstat: this.invoiceDetails.value.bulstatCtrl,
        citizenship: this.invoiceDetails.value.citizenshipCtrl,
        town: this.invoiceDetails.value.townCtrl,
        country: this.invoiceDetails.value.countryCtrl,
        postcode: this.invoiceDetails.value.phoneCtrl,
        phone: this.invoiceDetails.value.phoneCtrl,
        countryPhoneCode: this.invoiceDetails.value.countryPhoneCodeCtrl,
        GDPR: this.GDPR // this.invoiceDetails.value.GDPRCtrl
      };
      console.log(tmpInvoice);
      this.datastore.addOrEditCusInvoiceDetails(
        tmpInvoice,
        (data) => console.log(data),
        // (err) => console.log(err)
      );
    }
  }

}
