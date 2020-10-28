import { Component } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'site-nav-menu',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent {

  routeLinks: any;

  private unscStreamLang: Unsubscribable;

  constructor(
    private translateService: TranslateService
  ) {
    this.unscStreamLang = this.translateService.stream('navi').subscribe(lang => {
      this.routeLinks = [
        { label: lang.dashboard, link: 'dashboard', icon: 'dashboard' },
        { label: lang.customers, link: 'customers', icon: 'person' },
        { label: lang.employees, link: 'employees', icon: 'face' },
        { label: lang.orders, link: 'orders', icon: 'shopping_cart' },
        { label: lang.details, link: 'details', icon: 'details' },
        { label: lang.apiCon, link: 'api-con-data', icon: 'settings_applications' },
        { label: lang.siteLogs, link: 'site-logs', icon: 'notes' },
      ];
    });

  }

  ngOnDestroy(): void {
    if (this.unscStreamLang) { this.unscStreamLang.unsubscribe(); }
  }
}
