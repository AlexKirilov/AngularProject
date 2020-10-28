import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DatastoreService } from '../../../services/datastore.service';
import { HandleErrorsService } from '../../../services/handle-errors.service';

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

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
  }

  getData() {
    this.datastore.getAuthCustomers().pipe(take(1)).subscribe(
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
    this.datastore.updateCustomerDiscount(customer)
    .pipe(take(1)).subscribe(
      () => this.getData(),
      (err: any) => this.errorHandler.handleError(err)
    ); // TODO: Add SnackBar
    console.log('Save site-customer: ', customer);
  }

}
