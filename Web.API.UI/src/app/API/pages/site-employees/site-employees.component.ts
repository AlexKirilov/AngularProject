import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DatastoreService } from '../../../services/datastore.service';
import { HandleErrorsService } from '../../../services/handle-errors.service';

@Component({
  selector: 'app-site-employees',
  templateUrl: './site-employees.component.html',
  styleUrls: ['./site-employees.component.scss']
})
export class SiteEmployeesComponent implements OnInit {

  public step = null;
  public employees: any;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.getEmployees().pipe(take(1)).subscribe(
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

    this.datastore.updateEmployee(employee).pipe(take(1)).subscribe(
      (res: any) => this.getData(),
      (err: any) => this.errorHandler.handleError(err)
    );
  }
}
