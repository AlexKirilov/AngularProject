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
  loginBtn;
  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService
  ) {
    this.datashare.ifUser.subscribe( bool => {
      this.ifuser = bool;
      this.loginBtn = (bool) ? 'Logout' : 'login';
    });
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
    // (this.ifuser) ? this.router.navigate(['/login']) :
    this.datastore.logout();
  }

}
