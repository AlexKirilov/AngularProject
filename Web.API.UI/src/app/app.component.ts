import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatashareService } from './services/datashare.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  contentLoader: boolean;
  wrapperLoader: boolean;
  htmlLoader: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private datashare: DatashareService
  ) {
    this.datashare.spinnerWrapper.subscribe(bool => this.wrapperLoader = bool);
    this.datashare.spinnerContent.subscribe(bool => this.contentLoader = bool);
    this.datashare.spinnerHMTL.subscribe(bool => this.htmlLoader = bool);
    this.datashare.snackbarData.subscribe(data => this.openSnackBar(data.message, data.action))
  }

  openSnackBar(message: string, action: string) {
    if (message !== '') {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }
  }
}
