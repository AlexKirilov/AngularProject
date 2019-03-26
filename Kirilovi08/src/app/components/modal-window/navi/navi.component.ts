import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent {

  public ifuser: Boolean;
  public ifadmin: Boolean;
  public ifBasketSize = 0;
  public routeLinks: any[];
  public activeLinkIndex = 0;
  constructor(
    private datashare: DatashareService,
  ) {
    this.datashare.getBasket.subscribe( basket => this.ifBasketSize = basket.length);
    this.datashare.ifAdmin.subscribe( bool => this.ifadmin = bool);
    this.routeLinks = [
      // { label: 'Home', link: 'home' },
      { label: 'Products', link: 'products' },
      { label: 'Gallery', link: 'gallery' },
      { label: 'Contacts', link: 'contacts' },
      { label: 'About us', link: 'about' },
    ];
  }
}
