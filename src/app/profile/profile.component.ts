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
  email: FormControl;
  name: FormControl;
  password: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  dob: FormControl;
  public userObj: any;
  public updatMessage: string;

  constructor(public service: AppService) { }

  ngOnInit() {
    if (this.service.authenticateUser()) {
      this.userObj = JSON.parse(this.service.getFromBrowserStorage('userObj'));
    }
    this.email = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.dob = new FormControl('', Validators.required);
    this.createForm();
    this.updatMessage = undefined;
  }

  createForm() {
    this.profileForm = new FormGroup({
      email: this.email,
      name: this.name,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob
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
