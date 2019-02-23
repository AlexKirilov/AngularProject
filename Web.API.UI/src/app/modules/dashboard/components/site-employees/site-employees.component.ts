import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatastoreService } from '../../../../services/datastore.service';
import { Unsubscribable } from 'rxjs';
import { HandleErrorsService } from '../../../../services/handle-errors.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-employees',
  templateUrl: './site-employees.component.html',
  styleUrls: ['./site-employees.component.scss']
})
export class SiteEmployeesComponent implements OnInit, OnDestroy {

  public step = null;
  public employees: any;

  private unsGetDate: Unsubscribable;
  private unsUpdateEmployee: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsGetDate) { this.unsGetDate.unsubscribe(); }
    if (this.unsUpdateEmployee) { this.unsUpdateEmployee.unsubscribe(); }
  }

  getData() {
    this.unsGetDate = this.datastore.getEmployees().subscribe(
      (data) => this.employees = data,
      (err: any) => this.errorHandler.handleError(err)
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

  SaveEmployeesData(employee: any) {
    employee.type = (employee.levelAuth === 'EE') ? 'Employee' :
                    (employee.levelAuth === 'MN') ? 'Manager' :
                    (employee.levelAuth === 'CU') ? 'Customer' : '';

    this.unsUpdateEmployee = this.datastore.updateEmployee(employee).subscribe(
      (res: any) => console.log('User is updated', res),
      (err: any) => this.errorHandler.handleError(err)
    );
    console.log('Save employee: ', employee);
  }
}
