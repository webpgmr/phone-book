import { environment } from '../environments/environment';

export class AppConstants {

  apiRegister: string;
  apiLogin: string;

  constructor() {

    this.apiRegister = environment.apiBaseURL + '/pb_be/api/user/register.php';
    this.apiLogin = environment.apiBaseURL + '/pb_be/api/user/login.php';
  }
}
