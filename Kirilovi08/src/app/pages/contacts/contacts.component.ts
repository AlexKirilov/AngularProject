import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';
import { Title } from '@angular/platform-browser';
import { DatashareService } from 'src/app/services/datashare.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contacts: any;

  constructor (
    private titleService: Title,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorhandler: HandleErrorsService
  ) {
    this.titleService.setTitle('Contacts');
    this.datashare.changeCurrentPage('contacts');
  }

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
