export class Contact {

  public id: number;
  public user_id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public dob: string;
  public sex: string;
  public mobile: string;
  public landline: string;
  public street: string;
  public state: string;
  public country: string;
  public pincode: string;

  public constructor( ) {
    this.user_id = 0;
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.dob = '';
    this.sex = '';
    this.mobile = '';
    this.landline = '';
    this.street = '';
    this.state = '';
    this.country = '';
    this.pincode = '';
  }

}
