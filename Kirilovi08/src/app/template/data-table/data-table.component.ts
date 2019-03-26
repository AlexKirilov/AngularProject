import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() displayedColumns: Array<any>;
  @Input() dataSource;
  @Input() tableColumnNames;
  @Input() dateTransformNames;
  @Input() fullDate;
  @Input() total;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    console.log(this.dataSource);
  }

}
