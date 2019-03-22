import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPageIn: number = 1;
  @Input() startRow: number = 1;
  @Input() endRow: number = 1;
  @Input() allPages: number = 1;
  @Input() itemsPerPageIn: any = 25;
  @Input() allRecords: number = 0;

  @Output() currentPageOut = new EventEmitter<number>();
  @Output() itemsPerPageOut = new EventEmitter<number>();

  public paggingDetails: string = '';

  constructor() { }

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentPageIn && this.allPages && this.itemsPerPageIn) {
      // 1 - 10 of 6727667 records and 1 - 672767 pages
      this.paggingDetails = `${this.startRow} - ${this.endRow} of ${this.allRecords} records and ${this.currentPageIn} - ${this.allPages} pages`
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
}

