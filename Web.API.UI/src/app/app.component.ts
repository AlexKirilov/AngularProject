import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatashareService } from './services/datashare.service';
import devtools from 'devtools-detect/index.js';

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

  constructor(private snackBar: MatSnackBar, private datashare: DatashareService) {
    this.datashare.spinnerWrapper.subscribe(bool => (this.wrapperLoader = bool));
    this.datashare.spinnerContent.subscribe(bool => (this.contentLoader = bool));
    this.datashare.spinnerHMTL.subscribe(bool => (this.htmlLoader = bool));
    this.datashare.snackbarData.subscribe(data => this.openSnackBar(data.message, data.action));
    console.log(devtools.orientation);
    console.log(devtools.open);

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
