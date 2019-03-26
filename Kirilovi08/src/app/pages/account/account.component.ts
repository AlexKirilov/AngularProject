import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Unsubscribable } from 'rxjs';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';
import { Invoice, ContactsData } from '../../app.interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  public step = 0;
  public firstFormGroup: FormGroup;
  public invoiceDetails: FormGroup;

  private unscEditClient: Unsubscribable;
  private unscClientData: Unsubscribable;
  private unscEditCustInvoices: Unsubscribable;
  private unscGetCustmInvoices: Unsubscribable;

  constructor(
    private _formBuilder: FormBuilder,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) {
    this.prepareFGroupsModules();
  }

  ngOnInit() {
    this.getCustomerInvoices();
    this.getClientsData();
  }

  ngOnDestroy(): void {
    if (this.unscEditClient) { this.unscEditClient.unsubscribe(); }
    if (this.unscClientData) { this.unscClientData.unsubscribe(); }
    if (this.unscEditCustInvoices) { this.unscEditCustInvoices.unsubscribe(); }
    if (this.unscGetCustmInvoices) { this.unscGetCustmInvoices.unsubscribe(); }
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

  getClientsData() {
    this.unscClientData = this.datastore.getClientData().subscribe(
      (data: ContactsData) => {
        this.firstFormGroup.reset({
          firstnameCTRL: data.firstname,
          lastnameCTRL: data.lastname,
          emailCTRL: data.email,
          newEmailCTRL: '',
          companyCTRL: data.company
        });
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getCustomerInvoices() {
    this.unscGetCustmInvoices = this.datastore.getCustomerInvoices().subscribe(
      (data: Invoice) => {
        if (data['message']) {
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
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }


  SaveDataPersonal() {
    const user = {
      newEmail: this.firstFormGroup.value.newEmailCTRL,
      email: this.firstFormGroup.value.emailCTRL,
      firstname: this.firstFormGroup.value.firstnameCTRL,
      lastname: this.firstFormGroup.value.lastnameCTRL,
      company: this.firstFormGroup.value.companyCTRL,
    };

    this.unscEditClient = this.datastore.editClientData(user).subscribe(
      (res: any) => console.log('Edit Auth Data: ', res),
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
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

    this.unscEditCustInvoices = this.datastore.editCustomerInvoices(invoice).subscribe(
      (res) => {
        console.log('Invoices Edit Result: ', res);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  prepareFGroupsModules() {

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
}
