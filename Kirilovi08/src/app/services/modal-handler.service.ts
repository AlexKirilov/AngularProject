import { Injectable } from '@angular/core';
import { DatashareService } from './datashare.service';
import { MatDialog } from '@angular/material';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@Injectable({
    providedIn: 'root'
})
export class ModalHandlerService {
    private modalWidth = '600px'; // 450px;

    constructor(
        public dialog: MatDialog,
        private datashare: DatashareService
    ) { }

    stopSpinners() {
        this.datashare.stopSpinnerWrapper();
        this.datashare.stopSpinnerContent();
    }

    openModalImage(
      imgURL,
      callback = null
    ) {
      this.stopSpinners();
        const dialogRef = this.dialog.open(ModalWindowComponent, {
            width: '500px',
            data: {
                title: '',
                modal: 'image',
                imgURL
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (callback != null) { callback(result); }
        });
    }
    openModalTable(
        title: string = '',
        actions,
        dataSource,
        displayedColumns,
        tableColumnNames,
        dateTransformNames,
        displayedColumnsMedium,
        middleTableDataColumns,
        callback = null
    ): void {
        this.stopSpinners();
        const dialogRef = this.dialog.open(ModalWindowComponent, {
            width: '1360px',
            data: {
                title,
                actions,
                dataSource,
                modal: 'table',
                displayedColumns,
                tableColumnNames,
                dateTransformNames,
                displayedColumnsMedium,
                middleTableDataColumns
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (callback != null) { callback(result); }
        });
    }
}
