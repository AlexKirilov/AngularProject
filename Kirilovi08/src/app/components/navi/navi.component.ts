import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(
    private router: Router,
    private datastore: DatastoreService
  ) {
    this.routeLinks = [
      { label: 'Home', link: 'home' },
      { label: 'Products', link: 'products' },
      { label: 'Gallery', link: 'gallery' },
      { label: 'Contacts', link: 'contacts' },
      { label: 'About us', link: 'about' },
    ];
  }

  ngOnInit() {
  }

  
  logout() {
    this.datastore.logout();
  }

}
