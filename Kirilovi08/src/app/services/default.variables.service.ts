import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultVariablesService {

  public displayMSG;

  constructor() {
    this.displayMSG = {
      noData: 'There are no data found!',
      noRecords: 'There are no records found!',
      searching: 'Searching...',
      loading: 'Loading data...',
      toSelect: 'There are no selected records at the moment!',
      mvSearch: 'Enter data into the fields and search or press search to return all results.',
      onError: 'There was an server error! Data can`t be loaded at the moment, please try again later!'
    };
   }
}
