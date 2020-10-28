import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class APIRequests {
    public authorisation: string;
    public categories: string;
    public comments: string;
    public products: string;
    public invoces: string;
    public gallery: string;
    public orders: string;
    public logs: string;


    constructor() {
        this.authorisation = `
            private authURL = 'https://web-api-be.herokuapp.com';

            TOKEN_KEY = 'token';
            SITEDATA_KEY = 'SiteData';
            SITEID_KEY = 'WebSite';
            USERNAME = 'username';

            get token() {
                return localStorage.getItem(this.TOKEN_KEY);
            }

            get SiteData() {
                return localStorage.getItem(this.SITEDATA_KEY);
            }

            get WebSite() {
                return localStorage.getItem(this.SITEID_KEY);
            }

            get Username() {
                return localStorage.getItem(this.USERNAME);
            }

            setAuthorization(data) {
                localStorage.setItem(this.TOKEN_KEY, data.token);
                localStorage.setItem(this.SITEDATA_KEY, data.SiteData);
                localStorage.setItem(this.SITEID_KEY, data.WebSite);
                localStorage.setItem(this.USERNAME, data.username);
            }

            removeAuthorization() {
                localStorage.removeItem(this.TOKEN_KEY);
                localStorage.removeItem(this.SITEDATA_KEY);
                localStorage.removeItem(this.SITEID_KEY);
                localStorage.removeItem(this.USERNAME);
                this.datashare.showIfAdmin(false);
                this.datashare.showIfUser(false);
            }

            checkUser() {
                this.unscProd =  this.getProductEditLevel().subscribe(
                res => {
                    this.datashare.showIfAdmin(res === ((this.SiteData) ? this.SiteData.split(' ')[0] : null));
                    this.unscProd.unsubscribe();
                },
                (err: HttpErrorResponse) => {
                    this.errorHandler.handleError(err);
                }
                );
            }

            // Required data: { "password":"password", "email": "mail@mail.com" }
            getLogedIn(checkUser: any) {
                return this.http.post<UserI>(\`\${this.authURL}\`/customers/login, checkUser);
            }

            logout() {
                this.removeAuthorization();
                this.router.navigate(['/auth/login']);
            }

            // Required data: { "email": "mail@mail.com" }
            checkForExistingUserEmail(email: any) {
                return this.http.post<Boolean>(\`\${this.authURL}\`/customers/checkForUser, email);
            }

            // Required data: { "email": "mail@mail.com" }
            getClientData() {
                return this.http.get<any>(\`\${this.authURL}\`/customers/getCustomer);
            }

            // Required data: { userId: customer._id }
            // Return only the address of the specific client
            getCustomerAddress(userId: any) {
                return this.http.get<ContactsData>(\`\${this.url}\`/customers/getCustomerAddress, userId);
            }

            // Minimum required data: { "password":"password", "email": "mail@mail.com" }
            // Return all user Loggin data
            registry(newCustomer: any) {
                return this.http.post<any>(\`\${this.authURL}\`/customers/register, newCustomer);
            }

            // Minimum required data: {"email": "mail@mail.com" }
            /*
                const editCustomer = {
                    newEmail: [newEmail],
                    email: [oldEmail],
                    firstname: [firstname],
                    lastname: [lastname],
                    company: [company],
                };
            */
            editCustomer(editCustomer) { 
                return this.http.post<any>(\`\${this.authURL}\`/customers/editcustomer, editCustomer);
            }

            // DELETE Customers by them self's required data {}
            // DELETE from Admin or Manager by CustomersID or Customers Email required data {customerID or email}
            deleteCustomer(customer: any) { 
                return this.http.post<any>(\`\${this.authURL}\`/customers/deletecustomer, customer);
            }
        `;

        this.comments = `
            // Get All comments by productID
            // Required data { productID: [productID] }
            getProductComments(productID: any) {
                return this.http.post<CommentsI>(\`\${this.authURL}\`/comments/get, productID);
            }

            // Add comment to a specific product
            // Required data { comment: [comment], productID: [productID] }
            // Return the saved data
            setProductComment(productID: any) {
                return this.http.post<any>(\`\${this.authURL}\`/comments/create, productID);
            }

            // Remove comment from specific product
            // Required data { productID: [productID] }
            // Return the saved data
            removeProductComment(productID: any) {
                return this.http.post<any>(\`\${this.authURL}\`/comments/remove, productID);
            }
        `;

        this.logs = `
            // Return All if there are no searching criterias
            // With searching criterias
            const filter = '';
            // filter items per page
            // filter = '?perPage=[number]';
            // filter = '?page=[number]';
            // To sort the data
            // filter = '?sort=[columnName] + 'Desc' '
            // Example: 
            // filter = \`?perPage=10&page=1$sort=Date\`
            getLogs() {
                return this.http.get<any>(\`\${this.url}/logs/getLogs\`\${filter});
            }
        
            // Get All Logs types
            /*
            return => 
                this.logLevels = res.level;
                this.logTypes = res.type;
            */
            getLogsDateTypes() {
                return this.http.get<any>(\`\${this.url}/logs/logDataFilter\`);
            }
        
            // Delete all logs
            clearLogs() {
                return this.http.delete<any>(\`\${this.url}/logs/\`);
            }
        `;

        this.categories = `
            
            // Get all Categories without SubCategories
            getCategories() {
                return this.http.get<any>(\`\${this.url}/category/categories\`);
            }

            // Get all Sub Categories by parent category ID
            // Required data {"type":"[parent category ID]"}
            getSubCategories() {
                return this.http.get<any>(\`\${this.url}/category/categories\`);
            }

            /*
                Do not change it this type ID: 5b0428384953411bd455bb90 - it\`s static ID.
                // By Default will be loaded if the type property is null
                Required data:
                Create Sub Category: { "name": "bmw", "type":"5b0428384953411bd455bb90", "parentId":"5b05149b8d9e8024cc528527"}
                Create new Category: { "name": "bmw", "type":"5b0428384953411bd455bb90" }
            */
            setProductComment(newCategory: any) {
                return this.http.post<any>(\`\${this.authURL}\`/category/createcategory, newCategory);
            }

            // Check For Existing Category
            // Required data: { name: [catName] }
            checkForExistingCategory(newCategory: any) {
                return this.http.post<Boolean>(\`\${this.authURL}\`/category/checkForExistingCategory, newCategory);
            }

            // Required data { name: [catName] } or { "_id": "3123"}
            removeCategory(removeCat: any) {
                return this.http.post<Boolean>(\`\${this.authURL}\`/category/checkForExistingCategory, removeCat);
            }
        `;

        this.gallery = `
            getGallery() {
                return this.http.get<any>(\`\${this.authURL}/gallery/get\`);
            }

            // Only names or urls can be added to the DB
            // All images must be upload somewhere else
            addToGallery(images: array) {
                return this.http.post<any>(\`\${this.authURL}/gallery/add\`, images);
            }
        `;

        this.orders = `

            // Data can be filter by flags
            // flags = ABCDE - will return all records
            /*
                // -1 Canceled // 0 For approval // 1 Approved // 2 Delivering // 3 Delivered
                if (flag == 'A') tmp.push('-1')
                else if (flag == 'B') tmp.push('0')
                else if (flag == 'C') tmp.push('1')
                else if (flag == 'D') tmp.push('2')
                else if (flag == 'E') tmp.push('3')
            */

            let by = \`?perPage=\${this.itemsPerPage}&page=\${this.currentPage}&flags=BCD\`;
            getAllOrders(filters: any) {
                return this.http.get<any>(\`\${this.authURL}/orders/getorders\${filters}\`);
            }


            // sortColumnName + 'desc' - will order desc the data
            let by = \`?perPage=\${this.itemsPerPage}&page=\${this.currentPage}&sort=[sortColumnName]\`;
            getOrdersToConfirm() {
                return this.http.get<any>(\`\${this.authURL}/orders/getordersforapproval\${filters}\`);
            }

            // Send All available order information. All fields will be saved into DB
            addOrder(order: any) {
                return this.http.post<any>(\`\${this.authURL}/orders/addOrder\`, order);
            }

            // Edit Order
            // Exmple change the flag status of the order: { flag: -1, orderId: order.id }
            editOrder(order: any) {
                return this.http.post<any>(\`\${this.authURL}/orders/editOrder\`, order);
            }

            // Remove Order: { OrderID: order.id }
            removeOrder(order: any) {
                return this.http.post<any>(\`\${this.authURL}/orders/removeOrder\`, order);
            }
        `;

        this.products = `
            getProducts(items: any) {
                if (items === void 0) { items = ''; }
                if (items.sortBy.direction !== '') {
                    items.sortBy = \`\${items.sortBy.active}\${(items.sortBy.direction === 'desc') ? items.sortBy.direction : ''}\` || {};
                } else {
                    items.sortBy = '';
                }
                return this.http.post<Product>(\`\${this.authURL}/store/products\`, items);
            }

            /*
            Example: 'prod' - is the specific Product it self
            saveProd(prod: any) {
                this.editbtn = '';
                prod.name = this.prodName;
                prod.sort = this.prodSorts.split(',');
                prod.sort = prod.sort.filter(function (n) { return n !== undefined && n.trim() !== ''; });
                prod.details = this.prodDetails;
                prod.quantity = this.prodQuantity || 0;
                prod.price = this.prodPrice || 0;
                prod.pack = this.packageSize || '';
                prod.imgURL = this.imageURL || '';
                this.datastore.addEditProducts(prod).subscribe(
                  (data) => {
                    this.datashare.showSnackBar({ message: '"' + prod.name + '" product was updated', action: 'successfully' });
                  },
                  (err: HttpErrorResponse) => {
                    this.errorHandler.handleError(err);
                  }
                );
              }
            */
            addEditProducts(product: any) {
                return this.http.post<Product>(\`\${this.authURL}/store/createproduct\`, product);
            }


            /*
                Examples:

                removeProd(item: any) {
                    this.datastore.removeProductbyIdOrCategory(item).subscribe(
                      data => {
                        this.getProducts(); // Update the list after the Product is removed
                        this.datashare.showSnackBar({ message: '"' + item.name + '" product was removed', action: 'successfully' });
                      },
                      (err: HttpErrorResponse) => {
                        this.errorHandler.handleError(err);
                    });
                }

                removeProdByCat() {
                    this.errorHandler.openDialogPrompt(this.deleteConfirmation, (res) => {
                      if (res) {
                        this.datastore.removeProductbyIdOrCategory({ categoryID: this.selectedCat }).subscribe(
                          result => {
                            this.getProducts(); // Update the list after the Products are removed
                            this.datashare.showSnackBar({ message: 'All Products were removed', action: 'successfully' });
                            this.selectedCat = '';
                          },
                          (err: HttpErrorResponse) => {
                            this.errorHandler.handleError(err);
                          }
                        );
                      }
                    });
                }
            */

            // Return the productId or { categoryID: this.selectedCat }
            removeProductbyIdOrCategory(product: any) {
              return this.http.delete<Product>(\`\${this.authURL}/store/removeproducts\`, product);
            }

            // Remove All Products Functionality is disabled for security reasons
            removeAllProductByCategory(product: any) {
                return this.http.delete<Product>(\`\${this.authURL}/store/removeAllProductByCategory\`, product);
            }

            // Remove All Products Functionality is disabled for security reasons
            removeAllproductsByCustomer(product: any) {
                return this.http.delete<Product>(\`\${this.authURL}/store/removeAllproductsByCustomer\`, product);
            }
        `;

        this.invoces = `
            // TODO: Update on Phase 2
        `;
    }

}