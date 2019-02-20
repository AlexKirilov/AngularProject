import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { Unsubscribable } from 'rxjs';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private unscRouterEvents: Unsubscribable;
  constructor(
    private router: Router,
    private datastore: DatastoreService,
    private datashare: DatashareService
  ) {
    this.unscRouterEvents = router.events.pipe(distinctUntilChanged()).subscribe(event => {

      // this.menu = true;

      if (event instanceof NavigationStart) {

        this.datashare.changeIsUserLoggedIn(!!this.datastore.token);
        this.datashare.changeCurrentPage(event.url.substring(6)); // remove '/site/'
      }

      if (event instanceof NavigationCancel) { }

      if (event instanceof NavigationEnd) { }

      if (event instanceof NavigationError) {
        console.error('Error navigating through pages -> ', event.error);
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.datastore.logout();
  }
}
