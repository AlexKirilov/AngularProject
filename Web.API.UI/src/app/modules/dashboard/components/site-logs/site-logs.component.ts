import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DatastoreService } from '../../../../services/datastore.service';
import { MatSort, MatPaginator, MatTableDataSource } from '../../../../../../node_modules/@angular/material';
import { DefaultVariablesService } from '../../../../services/default.variables.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'api-site-logs',
  templateUrl: './site-logs.component.html',
  styleUrls: ['./site-logs.component.scss']
})
export class SiteLogsComponent implements OnInit, OnDestroy {

  SearchDate: any; // Date;
  noRecords = 'There are no logs found!';
  ///////////////////////////
  timer = 60;
  logTypes = [];
  logLevels = [];
  selectedType = '';
  selectedLevel = '';
  selectedSort;
  ///////////////////////////
  itemsPerPage;
  paggingDetails = '';
  paggingDetailsMd = '';
  currentPage: number;
  allItems = 0;
  allPages = 0;
  //////////////////////////

  reloadBool = false;
  reloadControlLabel = 'Stop autorefresh';
  //////////////////////////
  ///////////////////
  showDataMSG = '';
  // selectedRecord = '';
  displayedColumns = ['logDateTime', 'level', 'message'];
  noIssuersMSG = this.defaultVar.displayMSG.loading;

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe;
  private unsubscribeIssuer;
  private unsubscribeSpinner;
  private unsubscribeMatched;
    /////////////////////////
  // Unsubscribe variables
  private unsubscribeURL;
  private unscubsrcribeSearchDate;
  private unsubscribePageNumber;
  private unsubscribeItemsPerPage;
  private unsubscribeTool;
  private unsubscribeLevel;
  private timercountdown;

  tableColumnNames = { logDateTime: 'Date', level: 'Level', message: 'Message' };
  dateTransformNames = ['logDateTime'];
  displayedColumnsMedium = ['Data'];
  middleTableDataColumns = { 'Data': ['logDateTime', 'level', 'message'] };
  /////////////////
  constructor(
    private datastore: DatastoreService,
    private defaultVar: DefaultVariablesService,
  ) {}

  ngOnInit() {
    this.getData();
    this.getLogsFilter();
    this.startCountDown();
  }

  getData() {
    const by = {
      date: (this.SearchDate !== void 0) ? new Date(this.SearchDate) : null,
      type: (this.selectedType !== '') ? this.selectedType : null,
      level: (this.selectedLevel !== '') ? this.selectedLevel : null,
    };

    this.datastore.getLogsBySiteOwner(by, (logs) => (this.dataSource.data = logs, console.log(logs) ) );
  }

  getLogsFilter() {
    this.datastore.getLogsDateTypes((res) => (this.logLevels = res.level, this.logTypes = res.type));
  }
  reload() {
    this.timer = 60;
    this.getData();
  }

  startCountDown() {
    this.timercountdown = setInterval(() => {
      (this.timer === 1) ? this.reload() : this.timer--;
    }, 1000);
  }

  toggleReload() {
    this.reloadBool = !this.reloadBool;
    this.reloadControlLabel = (this.reloadBool) ? 'Start autorefresh' : 'Stop autorefresh';
    (this.reloadBool) ? clearInterval(this.timercountdown) : this.startCountDown();
  }

  searchBy() {
    // this.datashare.changeLogToolParam(this.selectedType);
    // this.datashare.changeLogLevelParam(this.selectedLevel);
    // this.datashare.changePageNumber(1); // Return to first page
    this.getData();
  }

  clearAllFilters() {
    // this.datashare.changeLogToolParam('all');
    // this.datashare.changeLogLevelParam('all');
    // this.datashare.changePageNumber(1);
    this.getData();
  }

  changeCurrentPage(page) {
    // this.datashare.changePageNumber(page);
    this.getData();
  }

  ngOnDestroy() {
    // if (this.unsubscribeItemsPerPage) this.unsubscribeItemsPerPage.unsubscribe();
    // if (this.unscubsrcribeSearchDate) this.unscubsrcribeSearchDate.unsubscribe();
    // if (this.unsubscribePageNumber) this.unsubscribePageNumber.unsubscribe();
    // if (this.unsubscribeLevel) this.unsubscribeLevel.unsubscribe();
    // if (this.unsubscribeTool) this.unsubscribeTool.unsubscribe();
    // if (this.unsubscribeURL) this.unsubscribeURL.unsubscribe();
    clearInterval(this.timercountdown);
  }
}
