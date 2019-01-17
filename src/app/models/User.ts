export class User {

  public id: number;
  public email: string;
  public name: string;
  public password: string;
  public token: string;

  public constructor( ) {
    this.id = 0;
    this.email = '';
    this.name = '';
    this.password = '';
    this.token = '';
  }

}
