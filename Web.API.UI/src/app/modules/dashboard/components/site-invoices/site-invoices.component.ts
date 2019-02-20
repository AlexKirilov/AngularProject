import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../../services/datastore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-invoices',
  templateUrl: './site-invoices.component.html',
  styleUrls: ['./site-invoices.component.scss']
})
export class SiteInvoicesComponent implements OnInit {

  constructor(
    private datastore: DatastoreService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.authInvoicesAll( (data) => {
      console.log('All Invoices', data);
    });
  }
}
