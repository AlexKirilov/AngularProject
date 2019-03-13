import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageHandlerComponent } from '../components/message-handler/message-handler.component';
import { ServiceProvider } from './services.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Unsubscribable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService implements OnDestroy {

  tmp: any;
  promptTest: any;
  elements: any;

  private modalWidth = '600px'; // 450px;
  private error: any; // Error;
  private isDisplayed: any;

  private unsubscribeModal: Unsubscribable;
  private unsubscribeDialogRef: Unsubscribable;
  private datastore: any;
  private datashare: any;

  constructor(
    public dialog: MatDialog,
    private services: ServiceProvider,
  ) {
    this.datastore = this.services.datastore;
    this.datashare = this.services.datashare;
    // TODO: Delete me - For testing purposes only
    this.error = { Title: 'error', ErrorMessage: 'This is an error message!', Type: 'error', ErrorSource: '', ErrorDateTime: 'sega' };
    this.promptTest = { Title: '', ErrorMessage: 'Are you sure that you wish to delete those files?', Type: 'prompt' };
    this.tmp = this.error;
    this.unsubscribeModal = this.datashare.isErrorHandleDisplayed.pipe(distinctUntilChanged()).subscribe(bool => this.isDisplayed);
  }

  ngOnDestroy(): void {
    if (this.unsubscribeModal) { this.unsubscribeModal.unsubscribe(); }
    if (this.unsubscribeDialogRef) { this.unsubscribeDialogRef.unsubscribe(); }
  }

  stopSpinners() {
    this.datashare.stopSpinnerWrapper();
    this.datashare.stopSpinnerContent();
    this.datashare.stopSpinnerModal();
  }

  openDialog(error, callback = null): void {
    this.stopSpinners();
    if (!this.isDisplayed) {
      const dialogRef = this.dialog.open(MessageHandlerComponent, {
        width: this.modalWidth,
        data: {
          title: ((error && error.Title) ? error.Title : error.Type) || 'error',
          message: error.ErrorMessage || error.error,
          msgType: error.Type || 'error',
          source: error.ErrorSource || 'error',
          time: error.ErrorDateTime || new Date(),
        }

      });

      this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
        if (callback != null) {
          callback(result);
        }
        this.datashare.changeIsErrorHandler(false);
      });
    }
  }

  openDialogPrompt(error, callback) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
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

    this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
      if (result === void 0) { result = false; }
      callback(result);
    });
  }

  openDialogInputs(data, callback) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: this.modalWidth,
      data: {
        title: '',
        message: data.msg,
        msgType: 'import',
        source: '',
        time: '',
        elements: data.data || null,
        elementsList: new FormControl()
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
      if (result === void 0) { result = false; }
      callback(result);
    });
  }

  openDialogReset(data: string, callback = null) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: this.modalWidth,
      data: {
        title: 'Password reset',
        msgType: 'passreset',
        cid: data
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
      if (callback != null) {
        callback(result);
      }
    });
  }

  openDialogStatus(data, callback = null) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: '650px',
      data: {
        title: 'status',
        msgType: 'status',
        elements: data || null,
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
      if (callback != null) {
        callback(result);
      }
    });
  }

  openDialogShortKeys(data, callback = null) {
    this.stopSpinners();
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: '650px',
      data: {
        title: 'Short Keys',
        msgType: 'shortkeys',
        elements: data || null,
        message: 'On the current page are available some short keys!'
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().pipe(distinctUntilChanged()).subscribe(result => {
      if (callback != null) {
        callback(result);
      }
    });
  }

  handleError(err: any): any {
    this.error = err;
    if (this.error && this.error.error && this.error.error.hasOwnProperty('sortColumn')) {
      this.datashare.stopSpinnerContent();
      this.datashare.showSnackBar({ message: 'The table can`t be sorted by this column name', action: '' });
    } else if (err.status === 401 || err.status === 403) { // if session has expired
      this.datastore.logout();
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
    } else if (err.status === 409) {
      // Default message only for conflicts
      this.error.Title = err.statusText;
      this.error.Type = 'warning';
      this.error.ErrorMessage = err.error.message;

      this.openDialog(this.error);
    } else if (err.status === 0 || err.statusText === 'Unknown Error') {
      // Default message only for unexpected /Unknown errors
      this.error.Title = 'error';
      this.error.Type = 'error';
      // tslint:disable-next-line:max-line-length
      this.error.ErrorMessage = 'Sorry! We could not load your data. There was an Internal Server Error! Please contact with your administrator or try again later.';
      this.openDialog(this.error);
    } else if (err.status === 500 || err.status === 503 || err.statusText === 'Service Unavailable') {
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
