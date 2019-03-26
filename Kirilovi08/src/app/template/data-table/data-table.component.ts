import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log('total', this.total);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

}
