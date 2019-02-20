import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-customers',
  templateUrl: './site-customers.component.html',
  styleUrls: ['./site-customers.component.scss']
})
export class SiteCustomersComponent implements OnInit {

  step = null;
  customers = [];
  employeesGroup: FormGroup;

  constructor(
    private datastore: DatastoreService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.getAuthCustomers( (data: any) => {
      console.log('Site-Customers: ', data);
      this.customers = data;
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

  SaveCustomersDiscount(customer) {
    console.log('Customerrrrr ', customer);
    this.datastore.updateCustomerDiscount(customer,
      res => console.log('Customer is updated', res) ); // TODO Add SnackBar
    console.log('Save site-customer: ', customer);
  }

}
