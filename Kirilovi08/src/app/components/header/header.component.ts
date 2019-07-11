import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { DatastoreService } from '../../services/datastore.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  isUser;
  username: String;

  private uns: Unsubscribable;
  @Input() langs = [];
  @Output() changeLang = new EventEmitter<boolean>();

  constructor(
    private datashare: DatashareService,
    private datastore: DatastoreService,
  ) {
    this.uns = this.datashare.ifUser.subscribe((bool) => {
      this.isUser = bool;
      this.username = this.datastore.Username;
    });
  }

  ngOnDestroy(): void {
    if (this.uns) { this.uns.unsubscribe(); }
  }

  changeMainLang($event: any) { this.changeLang.emit($event) }
}
