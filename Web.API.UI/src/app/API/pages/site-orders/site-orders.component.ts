import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HandleErrorsService } from '../../../services/handle-errors.service';
import { ServiceProvider } from '../../../services/services.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-orders',
  templateUrl: './site-orders.component.html',
  styleUrls: ['./site-orders.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class SiteOrdersComponent implements OnInit {
  step = null;
  ordersForApproval = [];
  employeesGroup: FormGroup;

  displayedColumns = ['name', 'image', 'price', 'prodClientQnt', 'total'];
  tableColumnNames = {
    name: 'Name',
    image: '',
    price: 'Price',
    prodClientQnt: 'Qnt',
    total: 'Total'
  };
  dateTransformNames = [];

  public filter = null;
  public optional: any;
  public startRow = 1;
  public allPages = 0;
  public allRecords = 0;
  public currentPage = 1;
  public itemsPerPage = '25';
  public endRow = this.itemsPerPage;
  public toggleOptionalSettings = true;

  private datashare: any;
  private datastore: any;

  constructor(
    private errorHandler: HandleErrorsService,
    private service: ServiceProvider
  ) {
    this.datashare = this.service.datashare;
    this.datastore = this.service.datastore;

    this.optional = {
      canceled: new FormControl(false),
      needApprove: new FormControl(true),
      approved: new FormControl(true),
      toClient: new FormControl(true),
      delivered: new FormControl(false),
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.datashare.startSpinnerContent();
    this.filterList();
    let by = `?perPage=${this.itemsPerPage}&page=${this.currentPage}`;
    
    if (this.filter != null) {
      by += `&flags=${this.filter}`;
    }
    
    this.datastore.getAllOrders(by).pipe(take(1)).subscribe(
      (data: any) => {
        this.allPages = data.pages;
        this.allRecords = data.rows;
        this.currentPage = data.page;
        this.itemsPerPage = data.perPage + '';
        this.endRow = data.lastRowOnPage;
        this.startRow = data.firstrowOnPage;
        this.ordersForApproval = data.results;
        this.datashare.stopSpinnerContent();
      },
      (err: Error) => this.errorHandler.handleError(err)
    );
  }

  getCustomersAddress(customer: any) {
    this.datastore
      .getCustomerAddress({ userId: customer._id })
      .pipe(take(1))
      .subscribe((details: any) => {
        if (!details || !details.address) {
          // Display modal window when there are no contact details
          this.errorHandler.openDialogSendClientAddressFormRequest(details, (d: any) => {
            if (d.sendReq) {
              // TODO: Send Request email to the client email - customer.email
              // SnackBar message - request is send to details.email
              this.datashare.showSnackBar({ message: 'Request email is send to ', action: details.email });
            } else {
              // TODO: Update client address details ????
              // Snack bar message - address is updated
              this.datashare.showSnackBar({ message: 'Address details were updated', action: 'successfully' });
            }
          });
        } else {
          console.log(details);
          this.errorHandler.openDialogClientAddress(details, (d: any) => console.log('Address', d));
        }
      });
  }

  filterList() {
    this.filter = '';

    if (this.optional.canceled.value) {
      this.filter += 'A';
    } if (this.optional.needApprove.value) {
      this.filter += 'B';
    } if (this.optional.approved.value) {
      this.filter += 'C';
    } if (this.optional.toClient.value) {
      this.filter += 'D';
    } if (this.optional.delivered.value) {
      this.filter += 'E';
    } if (this.filter === '') { this.filter = null; }

    return true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  editOrder(flag: number, orderId: string) {
    this.datastore.editOrder({ flag, orderId }).pipe(take(1)).subscribe(
      (res: any) => {
        this.getData();
      },
      (err: Error) => this.errorHandler.handleError(err)
    );
  }

  decline(order: any) {
    this.editOrder(-1, order._id);
  }

  accept(order: any) {
    this.editOrder(1, order._id);
  }

  sendToClient(order: any) {
    this.editOrder(2, order._id);
  }

  deliveredToClient(order: any) {
    this.editOrder(3, order._id);
  }

  changePageTo(page: number) {
    this.currentPage = page;
    this.getData();
  }

  changeItemsPerPage(perPage: any) {
    this.itemsPerPage = perPage;
    this.getData();
  }
}
