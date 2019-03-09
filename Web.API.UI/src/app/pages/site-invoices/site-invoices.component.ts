import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';

@Component({
  selector: 'app-site-invoices',
  templateUrl: './site-invoices.component.html',
  styleUrls: ['./site-invoices.component.scss']
})
export class SiteInvoicesComponent implements OnInit, OnDestroy {

  private unsgeTdata: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsgeTdata) { this.unsgeTdata.unsubscribe(); }
  }

  getData() {
    this.unsgeTdata = this.datastore.authInvoicesAll().subscribe(
      (data) => console.log('All Invoices', data),
      (err: any) => this.errorHandler.handleError(err)
    );
  }
}
