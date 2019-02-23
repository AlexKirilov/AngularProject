import { Injectable } from '@angular/core';
import { DatastoreService } from './datastore.service';
import { DatashareService } from './datashare.service';
// import { ErrorHandlerService } from './error-handler.service';
// import { ModalHandlerService } from './modal-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceProvider {

    // Fixing the 'WARNING in Circular dependency detected:' issue

    constructor(
        public datashare: DatashareService,
        public datastore: DatastoreService,
        // public errorHandler: ErrorHandlerService,
        // public modalHandler: ModalHandlerService,
    ) {

    }
}
