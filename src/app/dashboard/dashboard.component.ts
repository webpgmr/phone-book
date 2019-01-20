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
    this.spinner.show();
    const user_id = this.service.getFromBrowserStorage('user_id');
    const token = this.service.getFromBrowserStorage('token');
    const postData = {'user_id': user_id, 'token': token};
    this.service.sendDetails(this.apiGetProfile, postData).subscribe(res => {
      if (res.result && res.status_code === '200') {
        this.service.changeUserName(res.result.firstname + ' ' + res.result.lastname);
        this.service.changeIsUser(true);
        this.service.setToBrowserStorage('userObj', JSON.stringify(res.result));
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
  }

}
