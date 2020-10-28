import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatastoreService } from '../../../services/datastore.service';
import { DefaultVariablesService } from '../../../services/default.variables.service';
import { HandleErrorsService } from '../../../services/handle-errors.service';
import { take } from 'rxjs/operators';


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

    this.datastore.getLogsBySiteOwner(by).pipe(take(1)).subscribe(
      (logs: any) => this.dataSource.data = logs,
      (err: any) => this.errorHandler.handleError(err)
    );
  }

  getLogsFilter() {
    this.datastore.getLogsDateTypes().pipe(take(1)).subscribe(
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
    this.datastore.clearLogs().pipe(take(1)).subscribe(
      (res: any) => console.log(res),
      (err: any) => this.errorHandler.handleError(err)
    );

    this.getData();
  }

  ngOnDestroy() {
    clearInterval(this.timercountdown);
  }
}
