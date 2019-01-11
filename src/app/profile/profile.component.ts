import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  dob: FormControl;
  mobile: FormControl;
  landline: FormControl;
  street: FormControl;
  state: FormControl;
  country: FormControl;
  pincode: FormControl;

  public userObj: any;
  public updatMessage: string;

  constructor(public service: AppService) { }

  ngOnInit() {
    if (this.service.authenticateUser()) {
      this.userObj = JSON.parse(this.service.getFromBrowserStorage('userObj'));
    }
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.dob = new FormControl('', Validators.required);
    this.mobile = new FormControl('');
    this.landline = new FormControl('');
    this.street = new FormControl('');
    this.state = new FormControl('');
    this.country = new FormControl('');
    this.pincode = new FormControl('');
    this.createForm();
    this.updatMessage = undefined;
  }

  createForm() {
    this.profileForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob,
      mobile: this.mobile,
      landline: this.landline,
      street: this.street,
      state: this.state,
      country: this.country,
      pincode: this.pincode
    });
  }

  profileSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile Form Submitted!');
      this.updatMessage = 'Successfully Updated Profile';
    }
  }

  clearCache() {
    console.log('Cache clear called');
    this.service.clearBrowserSessions();
  }

}
