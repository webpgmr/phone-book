import { User } from './models/User';
import { Injectable } from '@angular/core';
import { AppConstants } from './app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AppService  extends AppConstants {

  public isUser = new BehaviorSubject(false);
  public userName = new BehaviorSubject('');
  public displayError: string;
  public serverCount: number;
  currentIsUser = this.isUser.asObservable();
  currentUserName = this.userName.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super();
    this.displayError = undefined;
    this.serverCount = 0;
  }

  changeIsUser(isUser: boolean) {
    this.isUser.next(isUser);
  }

  changeUserName(userName: string) {
    this.userName.next(userName);
  }

  // getting information from server  rest api
  public getDetails(endpoint, succMsg?: string, errMsg?: string): Observable<any> {
    return this.http.get(endpoint).pipe(
      tap(res => this.handleServerResponse(res, succMsg)),
      retry(3),
      catchError(this.handleError(errMsg, []))
    );
  }

   // Send contents to the server by post method
   public sendDetails(endpoint, postData, succMsg?: string, errMsg?: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(endpoint, JSON.stringify(postData), {
      headers: headers
    }).pipe(
      tap(res => this.handleServerResponse(res, succMsg)),
      catchError(this.handleError(errMsg, []))
      );
  }

  // Update contents to the server by rest api
  public updateDetails(endpoint, data, succMsg?: string, errMsg?: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.put(endpoint, JSON.stringify(data), {
      headers: headers
    }).pipe(
      tap(_ => console.log(succMsg + `updated data=${data}`)),
      retry(3),
      catchError(this.handleError<any>(errMsg))
      );
  }

  /**
   * Handle the server response for success
   * Decide to show page or continue
   * @param response
   */
  public handleServerResponse(result, message) {
    if (result.status_code !== '200') {
      console.log(result.message + " " + result.status_code);
    }
    return result;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.error.message}`);
      this.displayError = error.statusText;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public authenticateUser() {
    if ( this.getFromBrowserStorage('userObj') === null ) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.changeIsUser(true);
      return true;
    }
  }
  // Set value in browser storage
  public setToBrowserStorage(key: string, value?: any) {
    sessionStorage.setItem(key, value);
  }

  // get value from browser storage
  public getFromBrowserStorage(key: string): any {
    return sessionStorage.getItem(key);
  }

  public clearBrowserSessions(key?: string ) {
    if (key !== null && key !== '' && key !== undefined) {
      sessionStorage.removeItem(key);
    } else {
      // remove all available session Storage
      const userObj = sessionStorage.getItem('userObj');
      sessionStorage.clear();
      sessionStorage.setItem('userObj', userObj);
    }
  }

}
