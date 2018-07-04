import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';
import { ContactsDate, Invoice } from '../../../../app.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'api-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {

  step = 0;
  firstFormGroup: FormGroup;
  contactsDetails: FormGroup;
  invoiceDetails: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private datastore: DatastoreService
  ) {
    this.firstFormGroup = this._formBuilder.group({
      companyCTRL: ['', Validators.required],
      firstnameCTRL: [''],
      lastnameCTRL: [''],
      emailCTRL: ['', Validators.required],
      newEmailCTRL: ['', Validators.required]
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

  ngOnInit() {
    // GET Invoice data
    this.datastore.cusInvoiceDetails( (data: Invoice) => {
      this.invoiceDetails.reset({
        countryPhoneCodeCtrl: data.countryPhoneCode,
        citizenshipCtrl: data.citizenship,
        postcodeCtrl: data.postcode,
        countryCtrl: data.country,
        bulstatCtrl: data.bulstat,
        addressCtrl: data.address,
        phoneCtrl: data.phone,
        townCtrl: data.town,
        eikCtrl: data.eik
      });
    });

    this.datastore.getAuth( (data: ContactsDate) => {
      this.firstFormGroup.reset({
        firstnameCTRL: data.firstname,
        lastnameCTRL: data.lastname,
        emailCTRL: data.email,
        newEmailCTRL: '',
        companyCTRL: data.company
      });
    });

    this.datastore.getSiteContacts( (data: any) => {
      this.contactsDetails.reset(
        {
          phonesCtrl: data.phones,
          facebookCtrl: data.connections.facebook,
          twitterCtrl: data.connections.twitter,
          linkedinCtrl: data.connections.linkedin,
          skypeCtrl: data.connections.skype,
          latitudeCtrl: data.coordinates.latitude,
          longitudeCtrl: data.coordinates.longitude,
          urlCtrl: data.coordinates.url
        }
     );
  });
}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  SaveDataPersonal() {
    const user = {
      newEmail: this.firstFormGroup.value.newEmailCTRL,
      email: this.firstFormGroup.value.emailCTRL,
      firstname: this.firstFormGroup.value.firstnameCTRL,
      lastname: this.firstFormGroup.value.lastnameCTRL,
      company: this.firstFormGroup.value.companyCTRL,
    };

    this.datastore.editAuth(user,
      (res) => console.log('Edit Auth Data: ', res),
      (err) => console.log(err)
    );
  }

  SaveDataContacts() {
    const contacts = {
      phones: this.contactsDetails.value.phonesCtrl,
      connections: {
        facebook: this.contactsDetails.value.facebookCtrl,
        twitter: this.contactsDetails.value.twitterCtrl,
        linkedin: this.contactsDetails.value.linkedinCtrl,
        skype: this.contactsDetails.value.skypeCtrl,
      },
      coordinates: {
        latitude: this.contactsDetails.value.latitudeCtrl,
        longitude: this.contactsDetails.value.longitudeCtrl,
        url: this.contactsDetails.value.urlCtrl,
      }
    };

    this.datastore.addOrEditSiteContacts(contacts, (res) => {
      console.log('ContactDetails Edit Result: ', res);
    });
  }

  SaveDataInvoices() {
    const invoice = {
      address: this.invoiceDetails.value.addressCtrl,
      eik: this.invoiceDetails.value.eikCtrl,
      bulstat: this.invoiceDetails.value.bulstatCtrl,
      citizenship: this.invoiceDetails.value.citizenshipCtrl,
      town: this.invoiceDetails.value.townCtrl,
      country: this.invoiceDetails.value.countryCtrl,
      postcode: this.invoiceDetails.value.postcodeCtrl,
      phone: this.invoiceDetails.value.phoneCtrl,
      countryPhoneCode: this.invoiceDetails.value.countryPhoneCodeCtrl,
    };

    this.datastore.addOrEditCusInvoiceDetails(invoice, (res) => {
      console.log('Invoices Edit Result: ', res);
    });
  }
}
