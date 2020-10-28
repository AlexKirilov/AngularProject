import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DatastoreService } from '../../../services/datastore.service';
import { HandleErrorsService } from '../../../services/handle-errors.service';


@Component({
  selector: 'app-site-invoices',
  templateUrl: './site-invoices.component.html',
  styleUrls: ['./site-invoices.component.scss']
})
export class SiteInvoicesComponent implements OnInit {

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.datastore.authInvoicesAll().pipe(take(1)).subscribe(
      (data) => console.log('All Invoices', data),
      (err: any) => this.errorHandler.handleError(err)
    );
  }
}
