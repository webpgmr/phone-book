import { environment } from '../environments/environment';

export class AppConstants {

  apiRegister: string;

  constructor() {
    
    this.apiRegister = environment.apiBaseURL + '/register';
  }
}
