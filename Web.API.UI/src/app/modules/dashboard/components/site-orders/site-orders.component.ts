import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatastoreService } from 'src/app/services/datastore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'api-site-orders',
  templateUrl: './site-orders.component.html',
  styleUrls: ['./site-orders.component.scss']
})
export class SiteOrdersComponent implements OnInit {

  step = null;
  customers;
  employeesGroup: FormGroup;

  constructor(
    private datastore: DatastoreService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.getOrders( (data) => {
      console.log('Site-Orders: ', data);
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

}
