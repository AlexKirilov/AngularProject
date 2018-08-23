import { Component, OnDestroy } from '@angular/core';
import { DatashareService } from './services/datashare.service';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { DatastoreService } from './services/datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  contentLoader: boolean;
  wrapperLoader: boolean;
  modalWindow: boolean;
  htmlLoader: boolean;

  private unscSnackBar;
  private unscSpinnerHMTL;
  private unscSpinnerWrapper;
  private unscSpinnerContent;

  constructor(
    private snackBar: MatSnackBar,
    private datastore: DatastoreService,
    private datashare: DatashareService
  ) {
    console.log(this.datastore.Username, 'ds');
    this.datashare.showIfUser(this.datastore.Username !== '' && this.datastore.Username !== null);
    this.datastore.checkUser();
    // tslint:disable-next-line:no-unused-expression
    this.unscSpinnerHMTL = this.datashare.spinnerHMTL.subscribe(bool => this.htmlLoader = bool);
    this.unscSpinnerWrapper = this.datashare.spinnerWrapper.subscribe(bool => this.wrapperLoader = bool);
    this.unscSpinnerContent = this.datashare.spinnerContent.subscribe(bool => this.contentLoader = bool);
    this.unscSnackBar = this.datashare.snackbarData.subscribe(data => this.openSnackBar(data.message, data.action));
  }

  ngOnDestroy(): void {
    if (this.unscSnackBar) { this.unscSnackBar.unscubscribe(); }
    if (this.unscSpinnerHMTL) { this.unscSpinnerHMTL.unscubscribe(); }
    if (this.unscSpinnerWrapper) { this.unscSpinnerWrapper.unscubscribe(); }
    if (this.unscSpinnerContent) { this.unscSpinnerContent.unscubscribe(); }
  }

  openSnackBar(message: string, action: string) {
    if (message !== '') {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }
  }
}
