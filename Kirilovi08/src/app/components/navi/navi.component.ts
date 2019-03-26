import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  ifuser;
  ifadmin;
  loginBtn;
  ifBasketSize = 0;
  routeLinks: any[];
  activeLinkIndex = 0;
  constructor(
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService
  ) {
    this.datashare.getBasket.subscribe( basket => this.ifBasketSize = basket.length);
    this.datashare.ifUser.subscribe( bool => {
      this.ifuser = bool;
      this.loginBtn = (bool) ? 'Logout' : 'login';
    });
    this.datashare.ifAdmin.subscribe( bool => this.ifadmin = bool);
    this.routeLinks = [
      // { label: 'Home', link: 'home' },
      { label: 'Products', link: 'products' },
      { label: 'Gallery', link: 'gallery' },
      { label: 'Contacts', link: 'contacts' },
      { label: 'About us', link: 'about' },
    ];
  }

  ngOnInit() {
  }

  logout() {
    this.datashare.showIfUser(false);
    // (this.ifuser) ? this.router.navigate(['/login']) :
    this.datastore.logout();
  }

}
