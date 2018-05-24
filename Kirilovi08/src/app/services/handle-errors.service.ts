import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from './datashare.service';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {
  
  constructor(private router: Router, private data: DatashareService) { }

  errorMsg = '';
  showErrorMsg = false;

  public handleError(error: any): any {
    // TODO: Server error ... ????
    console.error('An error occurred', error);
    // if (error.status === 404) { // .info.status
    //   this.router.navigate(['/notfound']);
    // } else {
    //   this.data.changeErrorMsg(error.statusText);
    //   console.error('An error occurred', error); // for demo purposes only
    //   // return Promise.reject(error.message || error); TODO ....... or remove
    // }
  }
}
