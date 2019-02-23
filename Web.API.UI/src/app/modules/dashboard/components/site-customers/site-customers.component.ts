import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatastoreService } from '../../../../services/datastore.service';
import { HandleErrorsService } from '../../../../services/handle-errors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-customers',
  templateUrl: './site-customers.component.html',
  styleUrls: ['./site-customers.component.scss']
})
export class SiteCustomersComponent implements OnInit, OnDestroy {

  public step = null;
  public customers = [];
  public employeesGroup: FormGroup;

  private unsData: Unsubscribable;
  private unsCUDiscount: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsData) { this.unsData.unsubscribe(); }
    if (this.unsCUDiscount) { this.unsCUDiscount.unsubscribe(); }
  }

  getData() {
    this.unsData = this.datastore.getAuthCustomers().subscribe(
      (result: any) => this.customers = result,
      err => this.errorHandler.handleError(err)
    );
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

  SaveCustomersDiscount(customer: any) {
    this.unsCUDiscount = this.datastore.updateCustomerDiscount(customer).subscribe(
      (res: any) => console.log('Customer is updated', res),
      (err: any) => this.errorHandler.handleError(err)
    ); // TODO: Add SnackBar
    console.log('Save site-customer: ', customer);
  }

}
