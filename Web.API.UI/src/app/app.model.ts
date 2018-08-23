export class SnackBarI {
  message: string;
  action: string;
}

export class UserCreds {
  id: number;
  password: string;
  email: string;
  token: string;
}

export class NewUser {
  siteName: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export class Invoice {
  address: string;
  eik: string; // ЕИК
  bulstat: string; // БУЛСТАТ
  citizenship: string;
  town: string;
  country: string;
  postcode: string;
  phone: number;
  countryPhoneCode: string;
  GDPR: boolean;
  flag: number;
}

export class ContactsData {
  email: string;
  firstname: string;
  lastname: string;
  company: string;
  levelAuth: string;
  type: string; // Level only for users
}
