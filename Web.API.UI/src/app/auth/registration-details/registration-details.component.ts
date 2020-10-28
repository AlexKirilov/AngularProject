import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent {

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
    private titleService: Title,
    private _formBuilder: FormBuilder,
    private datastore: DatastoreService,
    private datashare: DatashareService,
    private errorHandler: HandleErrorsService,
  ) {
    this.setDefaultVar();
    this.titleService.setTitle('Reg Details');
    this.datashare.changeCurrentPage('reg-details');
  }

  SaveData () {
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

      this.editSiteData(tmpContacts);
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
      this.editCUInvoises(tmpInvoice);
    }
  }

  editSiteData(tmpContacts: object) {
    this.datastore.addOrEditSiteContacts(tmpContacts).pipe(take(1)).subscribe(
      (data) => console.log(data),
      (err: any) => this.errorHandler.handleError(err)
    );
  }

  editCUInvoises(tmpInvoice: object) {
    this.datastore.addOrEditCusInvoiceDetails(tmpInvoice).pipe(take(1)).subscribe(
      (data: any) => console.log(data),
      (err: any) => this.errorHandler.handleError(err)
    );
  }

  setDefaultVar() {
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
}
