export class User {

  public email: string;
  public name: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public dob: Date;

  public constructor( ) {
    this.email = '';
    this.name = '';
    this.password = '';
    this.lastname = '';
    this.dob = new Date();
  }

}
