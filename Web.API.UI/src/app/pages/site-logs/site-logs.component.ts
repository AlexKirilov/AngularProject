import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { DefaultVariablesService } from '../../services/default.variables.service';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-site-logs',
  templateUrl: './site-logs.component.html',
  styleUrls: ['./site-logs.component.scss']
})
export class SiteLogsComponent implements OnInit, OnDestroy {

  // TODO: Requires deep clean
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

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private unsGetLogs: Unsubscribable;
  private unsLogsTypes: Unsubscribable;
  private unsClearLogs: Unsubscribable;

  private timercountdown;

  tableColumnNames = { logDateTime: 'Date', level: 'Level', message: 'Message' };
  dateTransformNames = ['logDateTime'];
  displayedColumnsMedium = ['Data'];
  middleTableDataColumns = { 'Data': ['logDateTime', 'level', 'message'] };
  /////////////////
  constructor(
    private datastore: DatastoreService,
    private defaultVar: DefaultVariablesService,
    private errorHandler: HandleErrorsService,
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

    this.unsGetLogs = this.datastore.getLogsBySiteOwner(by).subscribe(
      (logs: any) => this.dataSource.data = logs,
      (err: any) => this.errorHandler.handleError(err)
    );
  }

  getLogsFilter() {
    this.unsLogsTypes = this.datastore.getLogsDateTypes().subscribe(
      (res) => {
        this.logLevels = res.level;
        this.logTypes = res.type;
      },
      (err: any) => this.errorHandler.handleError(err)
    );
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

  clearLogs() {
    this.unsClearLogs = this.datastore.clearLogs().subscribe(
      (res: any) => console.log(res),
      (err: any) => this.errorHandler.handleError(err)
    );

    this.getData();
  }

  ngOnDestroy() {
    if (this.unsGetLogs) { this.unsGetLogs.unsubscribe(); }
    if (this.unsLogsTypes) { this.unsLogsTypes.unsubscribe(); }
    if (this.unsClearLogs) { this.unsClearLogs.unsubscribe(); }
    // if (this.unsubscribeItemsPerPage) this.unsubscribeItemsPerPage.unsubscribe();
    // if (this.unscubsrcribeSearchDate) this.unscubsrcribeSearchDate.unsubscribe();
    // if (this.unsubscribePageNumber) this.unsubscribePageNumber.unsubscribe();
    // if (this.unsubscribeLevel) this.unsubscribeLevel.unsubscribe();
    // if (this.unsubscribeTool) this.unsubscribeTool.unsubscribe();
    // if (this.unsubscribeURL) this.unsubscribeURL.unsubscribe();
    clearInterval(this.timercountdown);
  }
}
