import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-api-connection-data',
  templateUrl: './site-api-connection-data.component.html',
  styleUrls: ['./site-api-connection-data.component.scss']
})
export class SiteApiConnectionDataComponent implements OnInit {
  url = 'testing';


  code = `
    private authURL = 'https://web-api-be.herokuapp.com';

    /////////////////////////////////////////
    //////////     GET    ///////////////////
    /////////////////////////////////////////

    getLogedIn(checkUser, callback, errcallback) {
      this.http.post<User>(\`\${this.authURL}/customers/login\`, checkUser)
      .subscribe(
        result => {
          console.log(result);
          this.setAuthorization(result);
          callback(result);
        },
        err => errcallback(err)
      );
    }

    getProductEditLevel (callback) {
      this.http.get(\`\${this.authURL}/store/geteditlevel\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getProducts(items, callback) {
      if (items === void 0) { items = ''; }
      if (items.sortBy.direction !== '') {
        items.sortBy = \`\${items.sortBy.active}\${(items.sortBy.direction === 'desc') ? items.sortBy.direction : ''}\` || {};
      } else {
        items.sortBy = '';
      }
      this.http.post<Product>(\`\${this.authURL}/store/products\`, items).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getCategories(callback) {
      this.http.get<any>(\`\${this.authURL}/category/categories\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getSubCategories(parentId, callback) {
      // Example {"parentId":"5b0428384953411bd455bb90"}
      this.http.get<any>(\`\${this.authURL}/category/subcategories\`, parentId).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getWebSiteData(callback) {
      this.http.get<any>(\`\${this.authURL}/sitedata/getsitecontacts\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getInvoices(invoices, callback) {
      // Need to be authorized
      // Default value {}
      // Can be searched by Country, Town, EIK, Bulstat, PostCode, Customer ID
      // { eik, town, bulstat, country, postcode, customerID }
      this.http.get<any>(\`\${this.authURL}/invoices/invoices\`, invoices).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }


    getCustomerInvoices(callback) {
      // Only Customer can get
      this.http.get<any>(\`\${this.authURL}/invoicecustomersdata/cusInvoiceDetails\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    editCustomerInvoices(invoiceDetails, callback) {
      this.http.post<any>(\`\${this.authURL}/invoicecustomersdata/addOrEditCusInvoiceDetails\`, invoiceDetails).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getGallery(callback) {
      this.http.get<any>(\`\${this.authURL}/gallery/get\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    checkForExistingUserEmail(email, callback) {
      this.http.post<Boolean>(\`\${this.authURL}/customers/checkForUser\`, email).subscribe(
        result => callback(result)
      );
    }

    checkForExistingCategory(categoryName, callback) {
      // Required data { "name": "clothes"}
      this.http.get<any>(\`\${this.authURL}/sitedata/checkForExistingCategory\`, categoryName).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    /////////////////////////////////////////
    ////////////// Customer
    getClientData(callback) {
      this.http.get<any>(\`\${this.authURL}/customers/getCustomer\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    editClientData(data, callback) {
      this.http.post<any>(\`\${this.authURL}/customers/editcustomer\`, data).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getOrders(callback) {
      this.http.get<any>(\`\${this.authURL}/orders/getorders\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getOrdersToConfirm(callback) {
      this.http.get<any>(\`\${this.authURL}/orders/getordersforapproval\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    addOrder(order, callback) {
      this.http.post<any>(\`\${this.authURL}/orders/addOrder\`, order).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    editOrder(order, callback) {
      this.http.post<any>(\`\${this.authURL}/orders/editOrder\`, order).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    /////////////////////////////////////////
    ////////// POST / PUT ///////////////////
    /////////////////////////////////////////

    addEditProducts(product, callback) {
      this.http.post<Product>(\`\${this.authURL}/store/createproduct\`, product).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }
    // addEditProducts(product, callback) {
    //   this.http.post<Product>(\`\${this.authURL}/store/editproduct\`, product).subscribe(
    //     result => callback(result),
    //     (err: HttpErrorResponse) => {
    //       this.errorHandler.handleError(err);
    //     }
    //   );
    // }

    registry(newUser, callback, errcallback) {
      this.http.post<NewUser>(\`\${this.authURL}/customers/register\`, newUser).subscribe(
        result => callback(result),
        err => errcallback(err)
      );
    }

    // TODO: Change here // Check the API BE
    editCustomer(newUser, callback, errcallback) {
      // As minimum required data for this call -> { "password":"password", "email": "mail@mail.com" } to be available
      this.http.post<NewUser>(\`\${this.authURL}/customers/editcustomer\`, newUser).subscribe(
        result => callback(result),
        err => errcallback(err)
      );
    }

    // TODO: Change here // Check the API BE
    addCategoryOrSubcategory(category, callback) {
      // Required data { "name": "bmw", "parentId":"5b05149b8d9e8024cc528527"} for v2 will be included and "type":"5b0428384953411bd455bb90"
      this.http.post<any>(\`\${this.authURL}/category/createcategory\`, category).subscribe(
        result => callback(result),
        err => this.errorHandler.handleError(err)
      );
    }

    addOrEditInvoice(callback) {
      // Requires data --> By Customer/Employee (level CU or EE) If edit need  {invoiceID}
      // Requires data --> By Admin or Manager or Employee { customerID } If Edit need {invoiceID}
      this.http.get<any>(\`\${this.authURL}/invoices/addOrEditInvoice\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }


    addOrEditCustomerInvoiceDetails(invoiceData, callback) {
      // Required Data {GDPR == true}
      // Only Customer can update or create Invoice Data
      this.http.get<any>(\`\${this.authURL}/invoicecustomersdata/addOrEditCusInvoiceDetails\`, invoiceData).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    addToGallery(images, callback) {
      this.http.post<any>(\`\${this.authURL}/gallery/add\`, images).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    /////////////////////////////////////////
    ////////////// DELETE ///////////////////
    /////////////////////////////////////////

    removeCustomer(customer, callback) {
      // DELETE Customer can delete his account no additional data needed {}
      // DELETE from Admin or Manager by CustomersID or customers Email required data {customerID or email}
      this.http.post<Product>(\`\${this.authURL}/store/deletecustomer\`, customer).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    removeProductbyIdOrCategory(productid, callback) {
      this.http.delete<Product>(\`\${this.authURL}/store/removeproducts\`, productid).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    // removeProductbyCustomer(callback) {
    //   this.http.post<Product>(\`\${this.authURL}/store/removeAllproductsByCustomer\`, '').subscribe(
    //     result => callback(result),
    //     (err: HttpErrorResponse) => {
    //       this.errorHandler.handleError(err);
    //     }
    //   );
    // }

    // removeAllProductbyCategory(cat, callback) {
    //   this.http.post<Product>(\`\${this.authURL}/store/removeAllProductByCategory\`, cat).subscribe(
    //     result => callback(result),
    //     (err: HttpErrorResponse) => {
    //       this.errorHandler.handleError(err);
    //     }
    //   );
    // }

    removeInvoices(removeInvoice, callback) {
      // Required Data { all: boolean, cutomerID or/and InvoiceID }
      this.http.get<any>(\`\${this.authURL}/invoices/removeinvoices\`, removeInvoice).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }

    removeCustomerInvoiceDetails(callback) {
      // Only customers can remove this data
      this.http.get<any>(\`\${this.authURL}/invoicecustomersdata/removeCusInvoiceDetails\`).subscribe(
        result => callback(result),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }
  `;

  constructor() {
    // this.code = `
    // this.displayMSG = {
    //   noData: 'There are no data found!',
    //   noRecords: 'There are no records found!',
    //   searching: 'Searching...',
    //   loading: 'Loading data...',
    //   toSelect: 'There are no selected records at the moment!',
    //   mvSearch: 'Enter data into the fields and search or press search to return all results.',
    //   onError: 'There was an server error! Data can't be loaded at the moment, please try again ' +
    //       'later!'
    // };
    // `;
  }

  ngOnInit() {
  }

}
