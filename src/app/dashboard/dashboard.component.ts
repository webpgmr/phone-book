import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './../app.service';
import { AppConstants } from './../app.constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AppConstants implements OnInit, OnDestroy {

  public geoLocation: any;
  public weatherData: any;
  public isData: boolean;
  public subscription: any;
  public temp: string;
  public userObj: any;
  constructor(
    public service: AppService,
    public spinner: Ng4LoadingSpinnerService ) {
    super();
    this.weatherData = {};
    this.isData = false;
  }

  ngOnInit() {
    this.service.displayError = undefined;
    this.spinner.show();
    if (this.service.authenticateUser() ) {
      // do nothing now
      this.spinner.hide();
    }
  }


  ngOnDestroy() {
  }

}
