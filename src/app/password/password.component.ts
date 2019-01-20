import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from './../app.service';
import { AuthenticationService} from './../auth.service';
import { AppConstants } from './../app.constants';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-password',
  providers: [AuthenticationService],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends AppConstants  implements OnInit {

  passwordForm: FormGroup;
  password: FormControl;
  repassword: FormControl;
  errorType: string;
  updatMessage: string;


  constructor(
    private service: AppService,
    private auth: AuthenticationService,
    public spinner: Ng4LoadingSpinnerService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.updatMessage = undefined;
    this.createForm();
  }

  createForm() {
    this.password = new FormControl('', Validators.required);
    this.repassword = new FormControl('', Validators.required);
    this.passwordForm = new FormGroup({
      password: this.password,
      repassword: this.repassword
    });
  }

  changePassword(data) {

    if (this.passwordForm.valid) {
          // console.log(data);
    if (data.password !== data.repassword) {
      this.errorType = 'danger';
      this.updatMessage = 'Password missmatch';
    } else {
        this.spinner.show();
        data.user_id = this.service.getFromBrowserStorage('user_id');
        this.service.sendDetails(this.apiPasswordChange, data, 'Password change Success', 'password').subscribe(res => {
          // console.log(res);
          if (res.status_code === '200') {
            this.errorType = 'success';
            this.updatMessage = 'Password Updated Successfully';
            this.passwordForm.reset();
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.errorType = 'danger';
            this.updatMessage = res.message;
          }
        }, (error) => {
          console.log(error);
          this.spinner.hide();
          this.passwordForm.reset();
          this.errorType = 'danger';
          this.updatMessage = 'Not able to change Password';
        });
     }
    }
  }
}
