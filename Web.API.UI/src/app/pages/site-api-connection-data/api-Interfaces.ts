export const interfaceList = `
    export class CommentsI {
        siteID: string; // Data will be auto populate.
        customerID: string; // Data will be auto populate.
        productID: string; // Data will be auto populate.
        comment: { type: String, default: '' };
        customersName: { type: String, default: '' };
    }

    export class UserI {
        id: number;
        username: string;
        password: string;
        email: string;
        token: string;
    }

    export class CustomerI {
        email: { type: String, required: true };
        firstname: { type: String, default: '' };
        lastname: { type: String, default: '' };
        company: { type: String, default: '' };
        type: { type: String, default: '' };
        personalDiscount: { type: Number, default: 0 };
        address: {
            country: { type: String, default: '' };
            town: { type: String, default: '' };
            postcode: { type: String, default: '' };
            address: { type: String, default: '' };
            address1: { type: String, default: '' };
            phone: { type: String, default: '' };
        }
    }

    export class CategoryI {
        name: { type: String, default: '' },
        type: string; // Data will be auto populate.
        parentId: string; // Data will be auto populate.
        siteID: string; // Data will be auto populate.
    }

    export class GalleryI {
        siteID: string; // Data will be auto populate.
        images: { default: [] }
    }

    export class InvoicesI {
        siteID: string; // Data will be auto populate.
        customerID: string; // Data will be auto populate.
        customerInvoiceID: string; // Data will be auto populate.
        address: { type: String, default: '' };
        eik: { type: String, default: '' }; //ЕИК
        bulstat: { type: String, default: '' }; //БУЛСТАТ
        citizenship: { type: String, default: '' };
        town: { type: String, default: '' };
        country: { type: String, default: '' };
        postcode: { type: String, default: '' };
        phone: { type: Number, default: 0 };
        countryPhoneCode: String;
        flag: { type: Number, default: 0 };
        dateOfCreation: { type: Date, default: Date() }; // Data will be auto populate.
    }

    export class OrdersI {
        siteID: string; // Data will be auto populate.
        customerID: string; // Data will be auto populate.
        order: { type: Array, default: [] };
        date: { type: Date, default: Date() }; // Data will be auto populate.
        flag: { type: Number, default: 0 }; // -1 Canceled // 0 For approval // 1 Approved // 2 Delivering // 3 Delivered
    }

    export ProductsI {
        siteID: string; // Data will be auto populate.
        // customerID: string; // Data will be auto populate., // For APP v 2
        categoryID: string; // Data will be auto populate.
        name: { type: String, default: '' },
        pack: { type: String, default: '' },
        sort: { type: Array, default: [] },
        sizes: { type: Array, default: [] },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        imgURL: { type: String, default: '' },
        iconURL: { type: String, default: '' },
        details: { type: String, default: '' },
        quantity: { type: Number, default: 0 },
    }
`;