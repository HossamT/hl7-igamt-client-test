export class RegistrationObject {
  constructor(public username: string, public fullname: string,
              public password: string, public  email: string, public signedConfidentialityAgreement: boolean) { }
}
