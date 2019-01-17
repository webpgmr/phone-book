import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from './../app.service';
import { AuthenticationService} from './../auth.service';
import { AppConstants } from './../app.constants';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppConstants implements OnInit {

  apiForm: FormGroup;
  name: FormControl;
  password: FormControl;
  errorType: string;
  updatMessage: string;

  constructor(
    private service: AppService,
    private auth: AuthenticationService,
    public spinner: Ng4LoadingSpinnerService,
    private router: Router) {
      super();
  }

  ngOnInit() {
    this.updatMessage = undefined;
    // logged in User
    if ( this.service.getFromBrowserStorage('token') !== null ) {
      this.router.navigate(['/dashboard']);
      // this.service.changeIsUser(true);
    }
    this.name = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.createForm();
  }

  createForm() {
    this.apiForm = new FormGroup({
      name: this.name,
      password: this.password
    });
  }

  continue() {
    if (this.apiForm.valid) {
      console.log('Form Submitted!');
      this.spinner.show();
      this.auth.login(this.name.value, this.password.value).subscribe(res => {
        // console.log(res);
        if (res.token && res.status_code === '200') {
          this.service.changeIsUser(true);
          this.apiForm.reset();
          this.spinner.hide();
          this.router.navigate(['/dashboard']);
        }
      }, (error) => {
        console.log(error);
        this.service.changeIsUser(true);
        this.spinner.hide();
        this.apiForm.reset();
        this.errorType = 'danger';
        this.updatMessage = 'Login Failed';
      });
    }
  }

}
