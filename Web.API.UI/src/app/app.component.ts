import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatashareService } from './services/datashare.service';
import devtools from 'devtools-detect/index.js';
import { DatastoreService } from './services/datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    '../../node_modules/shepherd.js/dist/css/shepherd-theme-default.css'
  ]
})
export class AppComponent {
  contentLoader: boolean;
  wrapperLoader: boolean;
  htmlLoader: boolean;
  auth: boolean;

  private authListExp = ['resetpass', 'login', 'signin', 'forgotpass', 'reg-details'];

  constructor(
    private snackBar: MatSnackBar,
    private datashare: DatashareService,
    private datastore: DatastoreService
    ) {
    this.datashare.spinnerWrapper.subscribe(bool => (this.wrapperLoader = bool)).unsubscribe();
    this.datashare.spinnerContent.subscribe(bool => (this.contentLoader = bool));
    this.datashare.spinnerHMTL.subscribe(bool => (this.htmlLoader = bool));
    this.datashare.snackbarData.subscribe(data => this.openSnackBar(data.message, data.action));
    console.log(devtools.orientation);
    console.log(devtools.open);
    this.datashare.currentPage.subscribe( (page: string) =>
        this.auth = (this.authListExp.includes(page)) ? false : true
    );

    window.addEventListener('devtoolschange', e => {
      // stateEl.textContent = e.detail.open ? 'yes' : 'no';
      // oriEl.textContent = e.detail.orientation ? e.detail.orientation : '';
      // console.log(e.target.detail.open);
      // console.log(e.detail.orientation);
      // console.log(!devtools.orientation);
      console.log(!devtools.open);
      if (!devtools.open) {
        console.log('You are trying to access not allowed area!!! Because of that you will be relocate after: 10 seconds!');
        let index = 10;
        const interval = setInterval(() => {
          --index;
          console.log(index);

          if (index === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    if (message !== ' ') {
      this.snackBar.open(message, action, { duration: 4000 });
    }
  }
}
