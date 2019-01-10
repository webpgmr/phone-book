import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  dob: FormControl;
  public userObj: any;
  public updatMessage: string;
  constructor(public service: AppService) { }

  ngOnInit() {#
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
    this.registerForm = new FormGroup({
      email: this.email,
      name: this.name,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob
    });
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      console.log('Registered successfully!');
      this.updatMessage = 'Successfully Registered';
    }
  }

  clearCache() {
    console.log('Cache clear called');
    this.service.clearBrowserSessions();
  }
}
