import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {


  public userObj: any;
  public updatMessage: string;

  constructor(public service: AppService) { }

  ngOnInit() {
    if (this.service.authenticateUser()) {
      this.userObj = JSON.parse(this.service.getFromBrowserStorage('userObj'));
    }
    this.updatMessage = undefined;
  }

}
