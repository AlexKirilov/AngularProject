import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { DatastoreService } from '../../services/datastore.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isUser: Boolean;
  public loginBtn = 'Login'
  public username: String;

  private unscIfUser: Unsubscribable;
  
  constructor(
    private datashare: DatashareService,
    private datastore: DatastoreService,
  ) {
    this.unscIfUser = this.datashare.ifUser.subscribe( (bool) => {
      this.isUser = bool;
      this.loginBtn = (bool) ? 'Logout' : 'login';
      this.username = this.datastore.Username;
    });
  }

  ngOnInit() {}
  ngOnDestroy():void {
    if (this.unscIfUser) { this.unscIfUser.unsubscribe(); }
  }

  
  logout() {
    this.datashare.showIfUser(false);
    this.datastore.logout();
  }
}
