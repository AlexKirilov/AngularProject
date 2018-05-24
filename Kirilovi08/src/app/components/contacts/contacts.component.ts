import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(42.3639561, 22.686734),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
