import { User } from './../models/User';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from './../app.constants';
import { AppService } from './../app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AppConstants implements OnInit {

  profileForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  dob: FormControl;
  sex: FormControl;
  mobile: FormControl;
  landline: FormControl;
  street: FormControl;
  state: FormControl;
  country: FormControl;
  pincode: FormControl;

  public userObj: User;
  public updatMessage: string;
  public countryList: Array<any>;
  public errorType: string;

  constructor(
    public service: AppService,
    public datePipe: DatePipe,
    public spinner: Ng4LoadingSpinnerService) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.updatMessage = undefined;
    this.userObj = JSON.parse(this.service.getFromBrowserStorage('userObj'));
    this.countryList = this.countryArrList;
    // console.log(this.userObj);
  }

  createForm() {
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.dob = new FormControl('', Validators.required);
    this.sex = new FormControl('');
    this.mobile = new FormControl('');
    this.landline = new FormControl('');
    this.street = new FormControl('');
    this.state = new FormControl('');
    this.country = new FormControl('');
    this.pincode = new FormControl('');

    this.profileForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob,
      sex: this.sex,
      mobile: this.mobile,
      landline: this.landline,
      street: this.street,
      state: this.state,
      country: this.country,
      pincode: this.pincode
    });
  }

  profileSubmit(data) {
    if (this.profileForm.valid) {
      data.dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
      data.user_id = this.service.getFromBrowserStorage('user_id');
      console.log(data);
      this.spinner.show();
      this.service.sendDetails(this.apiUpdateProfile, data, 'Update Profile Success', 'profile').subscribe(res => {
          if (res.status_code === '200') {
            console.log('Updated Profile successfully!');
            this.errorType = 'success';
            this.updatMessage = 'Profile Updated Successfully';
            this.mapUserObj(data);
            this.service.setToBrowserStorage('userObj', JSON.stringify(this.userObj));
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.errorType = 'danger';
            this.updatMessage = res.message;
          }
        }, (error) => {
            this.spinner.hide();
            this.errorType = 'danger';
            this.updatMessage = 'Sorry Updation Failed';
        });
    }
  }

  mapUserObj(data) {
    this.userObj.firstname = data.firstname;
    this.userObj.lastname = data.lastname;
    this.userObj.mobile = data.mobile;
    this.userObj.landline = data.landline;
    this.userObj.dob = data.dob;
    this.userObj.sex = data.sex;
    this.userObj.street = data.street;
    this.userObj.state = data.state;
    this.userObj.country = data.country;
    this.userObj.pincode = data.pincode;
  }

}
