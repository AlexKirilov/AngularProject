import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { Unsubscribable } from 'rxjs';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  private unscRouterEvents: Unsubscribable;
  state = 'hide'

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop + 60; // 45 height of the header
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }
  }

  constructor(
    public el: ElementRef,
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
