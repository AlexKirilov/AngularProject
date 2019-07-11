import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { TranslateService } from '@ngx-translate/core';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnDestroy {

  ifuser;
  ifadmin;
  loginBtn;
  ifBasketSize = 0;
  routeLinks: any[];
  activeLinkIndex = 0;
  loginLang: any;

  private unscgetBasket: Unsubscribable;
  private unscgetIfUser: Unsubscribable;
  private unscgetIfAdmin: Unsubscribable;
  private unscStreamLang: Unsubscribable;
  private unscStreamBtn: Unsubscribable;

  constructor(
    private router: Router,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private translateService: TranslateService
  ) {
    this.unscStreamLang = translateService.stream('navi').subscribe(lang => {
      this.routeLinks = [
        { label: lang.products, link: 'products' },
        { label: lang.gallery, link: 'gallery' },
        { label: lang.contacts, link: 'contacts' },
        { label: lang.aboutUs, link: 'about' },
      ];
    });

    this.unscStreamBtn = translateService.stream('buttons').subscribe(lang => {
      this.loginLang = lang;
      this.loginBtn = (!this.ifuser) ? lang.login : lang.logout;
    });

    this.unscgetBasket = this.datashare.getBasket.subscribe(basket => this.ifBasketSize = basket.length);

    this.unscgetIfUser = this.datashare.ifUser.subscribe(bool => {
      this.ifuser = bool;
      this.loginBtn = (!bool) ? this.loginLang ? this.loginLang.login : 'Log in' : this.loginLang ? this.loginLang.logout : 'Logout';
    });

    this.unscgetIfAdmin = this.datashare.ifAdmin.subscribe(bool => this.ifadmin = bool);
  }

  ngOnDestroy(): void {
    if (this.unscStreamBtn) { this.unscStreamBtn.unsubscribe(); }
    if (this.unscgetBasket) { this.unscgetBasket.unsubscribe(); }
    if (this.unscgetIfUser) { this.unscgetIfUser.unsubscribe(); }
    if (this.unscgetIfAdmin) { this.unscgetIfAdmin.unsubscribe(); }
    if (this.unscStreamLang) { this.unscStreamLang.unsubscribe(); }
  }

  logout() {
    this.datashare.showIfUser(false);
    this.datastore.logout();
  }

}
