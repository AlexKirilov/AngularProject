import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatashareService } from './datashare.service';
import { MessageHandlerComponent } from '../components/message-handler/message-handler.component';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  private modawWidth = '450px';
  private error: any; // Error;
  tmp;
  promptTest;
  elements;
  constructor(
    public dialog: MatDialog,
    private datashare: DatashareService,
  ) {
    // TODO: Delete me - For testing purposes only
    this.error = { Title: 'error', ErrorMessage: 'This is an error message!', Type: 'error', ErrorSource: '', ErrorDateTime: 'sega' };
    this.promptTest = { Title: '', ErrorMessage: 'Are you sure that you wish to delete those files?', Type: 'prompt' };
    this.tmp = this.error;
  }


  openDialog(error, callback = null): void {
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: this.modawWidth,
      data: {
        title: ((error && error.Title) ? error.Title : error.Type) || 'error',
        message: error.ErrorMessage || error.error,
        msgType: error.Type || 'error',
        source: error.ErrorSource || 'error',
        time: error.ErrorDateTime || new Date(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback != null) {
        callback(result);
      }
    });
  }

  openDialogPrompt(error, callback) {
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: this.modawWidth,
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
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: this.modawWidth,
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

  handleError(err: any): any {
    console.log('ErrorHandler Activated: ', err);
    this.error = err;
    if (err.status === 401 || err.status === 403) { // if session has expired
      this.openDialog(this.error, () => {
        // this.datastore.logout();
        console.log('In this case it should trigger the logout functionality : '); // ASK Michael how we should handle this situation
      });
    } else if (err.status === 404) { // Page or Data was/were not found
      // TODO: how we should handle this?
      // this.router.navigate(['/notfound']);
      console.error('Error 404: ', err);
      this.error = this.tmp;
      this.error.ErrorMessage = err.message;
      this.openDialog(this.error, (res) => {
        // this.datastore.logout();
        console.log('This should be an empty error result: ', res); // ASK Michael how we should handle this situation
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
      this.error.ErrorMessage = 'There was an Internal Server Error! Please contact with your administrator.';
      this.openDialog(this.error);
    } else {
      console.error('An error occurred', err); // for demo purposes only
      this.openDialog(this.error);
      // return Promise.reject(error.message || error); TODO ....... or remove
    }
    this.datashare.stopSpinnerWrapper();
    this.datashare.stopSpinnerContent();
  }
}
