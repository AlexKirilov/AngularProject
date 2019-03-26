import { Injectable } from '@angular/core';
import { DatashareService } from './datashare.service';
import { MatDialog } from '@angular/material';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';
import { Unsubscribable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModalHandlerService {
    private modalWidth = '600px'; // 450px;

    private unsc: Unsubscribable;
    constructor(
        public dialog: MatDialog,
        private datashare: DatashareService
    ) { }

    ngOnDestroy(): void {
        if (this.unsc) { this.unsc.unsubscribe(); }
    }
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

        this.unsc = dialogRef.afterClosed().subscribe(result => {
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

        this.unsc = dialogRef.afterClosed().subscribe(result => {
            if (callback != null) { callback(result); }
        });
    }

    openDialogClientAddress(data: any, callback = null) {
        this.stopSpinners();
        data.editable = true;
        const dialogRef = this.dialog.open(ModalWindowComponent, {
            width: '450px',
            data: {
                title: '', // Order to be delivert to:
                msgType: 'clientAddress',
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address
                    ? data.address
                    : {
                        postcode: '',
                        town: '',
                        country: '',
                        address: '',
                        address1: '',
                        phone: ''
                    }
            }
        });

        this.unsc = dialogRef.afterClosed().subscribe(result => {
            if (callback != null) {
                callback(result);
            }
        });
    }

    openDialogReset(data: string, callback = null) {
        this.stopSpinners();
        const dialogRef = this.dialog.open(ModalWindowComponent, {
            width: this.modalWidth,
            data: {
                title: 'Password reset',
                msgType: 'passreset',
                cid: data
            }
        });

        this.unsc = dialogRef
            .afterClosed()
            .pipe(distinctUntilChanged())
            .subscribe(result => {
                if (callback != null) {
                    callback(result);
                }
            });
    }
}
