import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  public contacts: any;

  constructor (
    private datastore: DatastoreService,
    private errorhandler: HandleErrorsService
  ) {}

  ngOnInit() {
    this.getData();
    this.setMap();
  }

  getData() {
    this.datastore.getWebSiteData().subscribe(
      (data: any) => {
        this.contacts = data;
        console.log(data);
      },
      (err: ErrorEventHandler) => {
        this.errorhandler.openDialog(err);
      }
    );
  }

  setMap () {
    const mapProp = {
      center: new google.maps.LatLng(42.3639561, 22.686734),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
