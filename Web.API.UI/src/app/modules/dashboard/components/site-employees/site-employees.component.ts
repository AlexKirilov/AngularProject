import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../../services/datastore.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'api-site-employees',
  templateUrl: './site-employees.component.html',
  styleUrls: ['./site-employees.component.scss']
})
export class SiteEmployeesComponent implements OnInit {

  step = null;
  employees;
  employeesGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datastore: DatastoreService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.getEmployees( (data) => {
      console.log('Employees: ', data);
      this.employees = data;
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

  SaveEmployeesData(employee) {
    // tslint:disable-next-line:max-line-length
    employee.type = (employee.levelAuth === 'EE') ? 'Employee' : (employee.levelAuth === 'MN') ? 'Manager' : (employee.levelAuth === 'CU') ? 'Customer' : '';
    this.datastore.updateEmployee(employee, res => console.log('User is updated', res) ); // TODO Add SnackBar
    console.log('Save employee: ', employee);
  }
}
