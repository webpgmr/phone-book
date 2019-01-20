import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from './../auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  providers: [AuthenticationService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserAvailable: boolean;
  public userName: string;
  public user_id: string;
  public userObj: any;
  public headerTitle: string;

  constructor(
    public service: AppService,
    public auth: AuthenticationService,
    private router: Router ) {
    this.isUserAvailable = false;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd && ( event.urlAfterRedirects === '/register') ) {
        this.headerTitle = 'Register';
      } else {
        this.headerTitle = 'Sign in';
      }
    });
  }

  ngOnInit() {
    this.service.currentIsUser.subscribe(isUserAvailable => this.isUserAvailable = isUserAvailable);
    this.service.currentUserName.subscribe(userName => this.userName = userName);
    this.user_id = JSON.parse(this.service.getFromBrowserStorage('user_id'));
    if ( this.user_id !== null ) {
      this.isUserAvailable = true;
      this.userObj = JSON.parse(this.service.getFromBrowserStorage('userObj'));
      this.userName = this.userObj.firstname + ' ' + this.userObj.lastname;
    }
  }

  logout() {
    this.auth.logout();
    this.service.changeIsUser(false);
    this.router.navigate(['/login']);
    // location.reload();
  }
}
