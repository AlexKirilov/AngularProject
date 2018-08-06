import { Injectable } from '@angular/core';
import { DatashareService } from './datashare.service';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ErrorHandlerComponent } from '../components/error-handler/error-handler.component';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {
  tmp;
  promptTest;
  elements;

  private modalWidth = '600px'; // 450px;
  private error: any; // Error;

  constructor(
    public dialog: MatDialog,
    private datashare: DatashareService,
  ) {
    // TODO: Delete me - For testing purposes only
    this.error = { Title: 'error', ErrorMessage: 'This is an error message!', Type: 'error', ErrorSource: '', ErrorDateTime: 'sega' };
    this.promptTest = { Title: '', ErrorMessage: 'Are you sure that you wish to delete those files?', Type: 'prompt' };
    this.tmp = this.error;
  }

  stopSpinners() {
    this.datashare.stopSpinnerWrapper();
    this.datashare.stopSpinnerContent();
  }

  openDialog(error, callback = null): void {
    this.stopSpinners();
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
      width: this.modalWidth,
      data: {
        title: ((error && error.Title) ? error.Title : error.Type) || 'error',
        message: error.ErrorMessage || error.error,
        msgType: error.Type || 'error',
        source: error.ErrorSource || 'error',
        time: error.ErrorDateTime || new Date(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback != null) {callback(result); }
    });
  }

  openDialogPrompt(error, callback) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
      width: this.modalWidth,
      data: {
        title: (error && error.Title) ? error.Title : error.Type,
        message: error.ErrorMessage,
        msgType: error.Type,
        source: error.ErrorSource || '',
        time: error.ErrorDateTime || '',
        elements: error.Elements || null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === void 0) { result = false; }
      callback(result);
    });
  }

  openDialogInputs(data, callback) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
      width: this.modalWidth,
      data: {
        title: '',
        message: data.msg,
        msgType: 'import',
        source: '',
        time: '',
        elements: data.data || null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === void 0) { result = false; }
      callback(result);
    });
  }

  openDialogStatus( data, callback = null) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
      width: '650px',
      data: {
        title: 'status',
        msgType: 'status',
        elements: data || null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback != null) { callback(result); }
    });
  }

  openDialogShortKeys( data, callback = null) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
      width: '650px',
      data: {
        title: 'Short Keys',
        msgType: 'shortkeys',
        elements: data || null,
        message: 'On the current page are available some short keys!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback !== null) { callback(result); }
    });
  }

  handleError(err: any): any {
    this.error = err;
    if (err.status === 401 || err.status === 403) { // if session has expired
      this.openDialog(this.error, () => {
        // this.datastore.logout();
      });
    } else if (err.status === 404) { // Page or Data was/were not found
      // TODO: how we should handle this?
      // this.router.navigate(['/notfound']);
      this.error = this.tmp;
      this.error.ErrorMessage = err.message;
      this.openDialog(this.error, (res) => {
        // this.datastore.logout();
      });
    } else if (err.status === 400) {
      // Default message only for unexpected /Unknown errors
      this.error.Title = err.statusText;
      this.error.Type = 'error';
      this.error.ErrorMessage = err.message;

      this.openDialog(this.error);
    } else if (err.status === 0 || err.statusText === 'Unknown Error') {
      // Default message only for unexpected /Unknown errors
      this.error.Title = 'error';
      this.error.Type = 'error';
      // tslint:disable-next-line:max-line-length
      this.error.ErrorMessage = 'Sorry! We could not load your data. There was an Internal Server Error! Please contact with your administrator or try again later.';
      this.openDialog(this.error);
    } else if (err.status === 503 || err.statusText === 'Service Unavailable') {
      // Default message only for unexpected /Unknown errors
      this.error.Title = 'error';
      this.error.Type = 'error';
      // tslint:disable-next-line:max-line-length
      this.error.ErrorMessage = 'We are sorry, but this service is unavailable for the moment! Please contact with your administrator or try again later.';
      this.openDialog(this.error);
    } else {
      this.openDialog(this.error);
      // return Promise.reject(error.message || error); TODO ....... or remove
    }
  }
}
