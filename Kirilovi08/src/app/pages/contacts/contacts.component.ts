import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contacts: any;

  constructor (
    private datastore: DatastoreService,
    private errorhandler: HandleErrorsService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datastore.getWebSiteData().subscribe(
      (data: any) => {
        this.contacts = data;
      },
      (err: ErrorEventHandler) => {
        this.errorhandler.openDialog(err);
      }
    );
  }
}
