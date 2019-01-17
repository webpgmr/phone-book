import { Component, OnInit } from '@angular/core';
import { AppConstants } from './../app.constants';
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AppConstants implements OnInit {

  registerForm: FormGroup;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  dob: FormControl;
  maxDate: Date;
  public userObj: User;
  public updatMessage: string;
  public errorType: String;
  constructor(public service: AppService, public router: Router, public spinner: Ng4LoadingSpinnerService) {
    super();
    this.userObj = new User();
  }

  ngOnInit() {
    // logged in User
    if ( this.service.getFromBrowserStorage('token') !== null ) {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
    this.updatMessage = undefined;
    this.errorType = '';
    this.spinner.hide();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getMonth() - 1);
  }

  createForm() {
    this.email = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.dob = new FormControl('', Validators.required);
    this.registerForm = new FormGroup({
      email: this.email,
      name: this.name,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob
    });
  }

  registerSubmit(data) {
    console.log(data);
    this.spinner.show();
    if (this.registerForm.valid) {
      this.service.sendDetails(this.apiRegister, data, 'register Success', 'register').subscribe(res => {
        if (res.result) {
          console.log('Registered successfully!');
          this.errorType= 'success';
          this.updatMessage = 'Successfully Registered';
          this.spinner.hide();
          this.registerForm.reset();
        }
      }, (error) => {
        this.spinner.hide();
        this.errorType= 'danger';
        this.updatMessage = 'Sorry Registratiin Failed';
      });
    }
  }

  clearCache() {
    console.log('Cache clear called');
    this.service.clearBrowserSessions();
  }
}
