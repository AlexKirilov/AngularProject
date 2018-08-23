import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  step = 0;
  firstFormGroup: FormGroup;
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
    this.datastore.getCustomerInvoices( (data: Invoice) => {
      if (data['message']) {
        // kk
      } else {
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
      }
    });

    this.datastore.getClientData( (data: ContactsData) => {
      this.firstFormGroup.reset({
        firstnameCTRL: data.firstname,
        lastnameCTRL: data.lastname,
        emailCTRL: data.email,
        newEmailCTRL: '',
        companyCTRL: data.company
      });
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

    this.datastore.editClientData(user,
      (res) => console.log('Edit Auth Data: ', res)
    );
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

    this.datastore.editCustomerInvoices(invoice, (res) => {
      console.log('Invoices Edit Result: ', res);
    });
  }
}

export class Invoice {
  address: string;
  eik: string; // ЕИК
  bulstat: string; // БУЛСТАТ
  citizenship: string;
  town: string;
  country: string;
  postcode: string;
  phone: number;
  countryPhoneCode: string;
  GDPR: boolean;
  flag: number;
}

export class ContactsData {
  email: string;
  firstname: string;
  lastname: string;
  company: string;
  levelAuth: string;
  type: string; // Level only for users
}
