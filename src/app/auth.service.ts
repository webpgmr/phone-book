import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConstants } from './app.constants';


// @Injectable({ providedIn: 'root' })
@Injectable()
export class AuthenticationService extends AppConstants {
    constructor(private http: HttpClient) {
      super();
    }

    login(username: string, password: string) {
      const postData = {'username': username, 'password': password};
      // console.log(JSON.stringify(postData));
      return this.http.post<any>(this.apiLogin, JSON.stringify(postData))
          .pipe(map(res => {
              // login successful if there's a user in the response
              if (res.token) {
                  // store user details and basic auth credentials in local storage
                  sessionStorage.setItem('token', res.token);
                  sessionStorage.setItem('user_id', res.user_id);
              }

              return res;
          }));
    }

    logout() {
        // remove user from session storage to log user out
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userObj');
    }
}
