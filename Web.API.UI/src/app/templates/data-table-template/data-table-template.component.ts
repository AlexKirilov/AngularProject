import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, PageEvent } from '@angular/material';
import { of, merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'api-data-table-template',
  templateUrl: './data-table-template.component.html',
  styleUrls: ['./data-table-template.component.scss']
})
export class DataTableTemplateComponent implements OnInit {


  @Input() displayedColumns: Array<any>;
  @Input() dataSource;
  @Input() displayedColumnsMedium;
  @Input() middleTableDataColumns;
  @Input() tablePagginationOnOff; // New name
  @Input() isTableHasTwoColumns;
  @Input() dateTransformNames;
  @Input() tableColumnNames;
  @Input() paggingDetailsMd;
  @Input() paggingDetails;
  @Input() currentPageIn;
  @Input() itemsPerPageIn;
  @Input() serverPagging; // New name
  @Input() clickableRows;
  @Input() allRecords;
  @Input() fullDate;
  @Input() allPages;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() currentPageOut = new EventEmitter<number>();
  @Output() itemsPerPageOut = new EventEmitter<number>();
  @Output() clearAllFilters = new EventEmitter<null>();
  @Output() OnRowClickReturnRow = new EventEmitter<any>(); // New name
  @Output() sortingChanged = new EventEmitter<any>();
  @Output() OnRowClick = new EventEmitter<any>();

  selectedRecord: any;
  pageEvent: PageEvent;
  displayedColumnsSmall = ['Data'];
  constructor() {
  }

  ngOnInit() {
    if (this.fullDate === void 0) { this.fullDate = false; }
    if (this.clickableRows === void 0) { this.clickableRows = false; }
    if (this.serverPagging === void 0) { this.serverPagging = false; }
    if (this.allPages === void 0) { this.allPages = 0; }
    if (this.allRecords === void 0) { this.allRecords = 0; }
    if (this.currentPageIn === void 0) { this.currentPageIn = 0; }
    if (this.itemsPerPageIn === void 0) { this.itemsPerPageIn = 0; }
    if (this.paggingDetails === void 0) { this.paggingDetails = ''; }
    if (this.paggingDetailsMd === void 0) { this.paggingDetailsMd = ''; }
    if (this.isTableHasTwoColumns === void 0) { this.isTableHasTwoColumns = false; }
    if (this.tablePagginationOnOff === void 0) {
      this.tablePagginationOnOff = (this.allRecords === 0 && this.itemsPerPageIn === 0) ? false : true;
    }

    if (this.dataSource) { this.dataSource.sort = this.sort; }
    if (this.dataSource && !this.serverPagging) { this.dataSource.paginator = this.paginator; }

  }
  /////////////// NEW CODE //////////////////////////////
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this.serverPagging) {
      this.sort.sortChange.subscribe(() => this.sortingChanged.emit(this.sort));
      // this.paginator.page.subscribe((pag) => { // This may be used in furure - Not working properly
      //   if (pag.pageSize != this.itemsPerPageIn) this.itemsPerPageOut.emit(pag.pageSize);
      //   if (++pag.pageIndex != this.currentPageIn) this.currentPageOut.emit(++pag.pageIndex);
      // });
    }
  }

  ///////////////////////////////////
  firstPage() {
    this.currentPageIn = 1;
    this.currentPageOut.emit(1);
  }
  prevPage() {
    this.currentPageOut.emit(--this.currentPageIn);
  }

  nextPage() {
    this.currentPageOut.emit(++this.currentPageIn);
  }

  lastPage() {
    this.currentPageOut.emit(this.allPages);
  }

  ///////////////////////////////////

  changeItemsPerPage() {
    this.itemsPerPageOut.emit(this.itemsPerPageIn);
  }

  clearAllFields() {
    this.clearAllFilters.emit();
  }

  ifMiddle(): boolean {
    if (this.displayedColumnsMedium) {
      return this.displayedColumnsMedium.length > 0;
    } else { return false; }
  }

  selectRecord(el) {
    if (this.clickableRows) {
      this.OnRowClick.emit(el);
      this.selectedRecord = el;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
  }
}


/*
[class.hide]="dataSource.data.length == 0"
              [dataSource]="dataSource"
              [displayedColumns]="displayedColumns"
              [tableColumnNames]="tableColumnNames"
              [dateTransformNames]="dateTransformNames"
              [displayedColumnsMedium]="displayedColumnsMedium"
              [middleTableDataColumns]="middleTableDataColumns"
              [serverPagging]="false">
*/

/*
<h3 id="noResultsMSG" [class.hide]="dataSource.data.length !== 0">{{displayMSG}}</h3>
    <tools-data-table-template
      [class.hide]="dataSource.data.length == 0"
      [dataSource]="dataSource"
      [displayedColumns]="resultsMappingsColumns"
      [tableColumnNames]="tableColumnNames"
      [dateTransformNames]="dateTransformNames"
      [displayedColumnsMedium]="displayedColumnsMedium"
      [middleTableDataColumns]="middleTableDataColumns"
      [fullDate]="false"
      [currentPageIn]="currentPage"
      [itemsPerPageIn]="itemsPerPage"
      [paggingDetails]="paggingDetails"
      [paggingDetailsMd]="paggingDetailsMd"
      [allRecords]="allItems"
      [allPages]="allPages"
      [serverPagging]="true"
      (currentPageOut)="changeCurrentPage($event)"
      (itemsPerPageOut)="changeItemsPerPage($event)"
      (sortingChanged)="sortingChanged($event)"
      (clearAllFilters)="clearAllFilters()">
    </tools-data-table-template>
*/
