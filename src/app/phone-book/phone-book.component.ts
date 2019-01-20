import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './../app.service';
import { AppConstants } from './../app.constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Contact } from '../models/Contact';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent extends AppConstants implements OnInit {

  @ViewChild('contactTable') table: any;
  contactForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  email: FormControl;
  dob: FormControl;
  sex: FormControl;
  mobile: FormControl;
  landline: FormControl;
  street: FormControl;
  state: FormControl;
  country: FormControl;
  pincode: FormControl;

  public contactObj: any;
  public updatMessage: string;
  public isCollapsed: boolean;
  public message: string;
  public countryList: Array<any>;
  public errorType: string;
  public contacts: any;
  public totaCount: number;

  public displayData: any;
  public tempData: any;
  public displayColumns = [
    { prop: 'firstname' },
    { name: 'lastname' },
    { name: 'email' },
    { name: 'mobile' }
  ];
  public editView: boolean;
  constructor(public service: AppService,
    public datePipe: DatePipe,
    public spinner: Ng4LoadingSpinnerService) {
    super();
  }

  ngOnInit() {
    this.updatMessage = undefined;
    this.isCollapsed = true;
    this.contactObj = new Contact();
    this.countryList = this.countryArrList;
    this.totaCount = 0;
    this.editView = false;
    this.createForm();
    this.contacts = undefined;
    this.getContacts();
  }

  getContacts() {
    const data = {'user_id': this.service.getFromBrowserStorage('user_id')};
    this.service.sendDetails(this.apigetContact, data, 'Get Contact Success', 'Contact').subscribe(res => {
      if (res.status_code === '200') {
        console.log('Contact list!');
        if (res.data !== '') {
          this.contacts = res.data.result;
          this.totaCount = res.data.result.length;
          this.displayData = this.contacts;
          this.tempData = this.contacts;
        }
        this.isCollapsed = true;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.errorType = 'danger';
        this.updatMessage = res.message;
      }
    }, (error) => {
      this.spinner.hide();
      this.errorType = 'danger';
      this.updatMessage = 'Sorry coundnt get contact';
    });
  }

  deleteContacts(id) {
    const data = {'user_id': this.service.getFromBrowserStorage('user_id'), 'id': id};
    this.service.sendDetails(this.apidelContact, data, 'Delete Contact Success', 'Contact').subscribe(res => {
      if (res.status_code === '200') {
        this.getContacts();
      } else {
        this.spinner.hide();
        this.errorType = 'danger';
        this.updatMessage = res.message;
      }
    }, (error) => {
      this.spinner.hide();
      this.errorType = 'danger';
      this.updatMessage = 'Sorry coundnt delete contact';
    });
  }
  createForm() {
    this.firstname = new FormControl('', Validators.required);
    this.lastname = new FormControl('', Validators.required);
    this.dob = new FormControl('', Validators.required);
    this.sex = new FormControl('');
    this.email = new FormControl('');
    this.mobile = new FormControl('');
    this.landline = new FormControl('');
    this.street = new FormControl('');
    this.state = new FormControl('');
    this.country = new FormControl('');
    this.pincode = new FormControl('');

    this.contactForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      dob: this.dob,
      sex: this.sex,
      email: this.email,
      mobile: this.mobile,
      landline: this.landline,
      street: this.street,
      state: this.state,
      country: this.country,
      pincode: this.pincode
    });

  }

  collapsed(): void {
    this.message = 'collapsed';
  }

  expanded(): void {
    this.message = 'expanded';
  }

  contactSubmit(data) {
    this.updatMessage = undefined;
    if (this.contactForm.valid) {
      data.dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
      data.user_id = this.service.getFromBrowserStorage('user_id');
      console.log(data);
      this.spinner.show();
      this.service.sendDetails(this.apiaddContact, data, 'Add Contact Success', 'Contact').subscribe(res => {
          if (res.status_code === '200') {
            console.log('Added Contact Successfully!');
            this.errorType = 'success';
            this.updatMessage = 'Contact Added Successfully';
            this.contactForm.reset();
            this.getContacts();
          } else {
            this.spinner.hide();
            this.errorType = 'danger';
            this.updatMessage = res.message;
          }
        }, (error) => {
          this.spinner.hide();
          this.errorType = 'danger';
          this.updatMessage = 'Sorry Contact Add Failed';
        });
    }
  }

  editContactSubmit(data, id){
    console.log(id);
    this.updatMessage = undefined;
    if (this.contactForm.valid) {
      data.dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
      data.user_id = this.service.getFromBrowserStorage('user_id');
      data.id = id;
      console.log(data);
      this.spinner.show();
      this.service.sendDetails(this.apieditContact, data, 'Edit Contact Success', 'Contact').subscribe(res => {
          if (res.status_code === '200') {
            console.log('Edited Contact Successfully!');
            this.errorType = 'success';
            this.updatMessage = 'Contact Edited Successfully';
            this.getContacts();
          } else {
            this.spinner.hide();
            this.errorType = 'danger';
            this.updatMessage = res.message;
          }
        }, (error) => {
          this.spinner.hide();
          this.errorType = 'danger';
          this.updatMessage = 'Sorry Contact Add Failed';
        });
    }
  }
  mapContactObj(data) {
    this.contactObj.firstname = data.firstname;
    this.contactObj.lastname = data.lastname;
    this.contactObj.mobile = data.mobile;
    this.contactObj.landline = data.landline;
    this.contactObj.email = data.email;
    this.contactObj.dob = data.dob;
    this.contactObj.sex = data.sex;
    this.contactObj.street = data.street;
    this.contactObj.state = data.state;
    this.contactObj.country = data.country;
    this.contactObj.pincode = data.pincode;
  }
  
  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
    this.updatMessage = undefined;
    this.createForm();
  }  

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.collapseAllRows();
    this.editView = false;
    this.table.rowDetail.toggleExpandRow(row);
  }

  toggleExpandEditRow(row) {
    console.log('Toggled Edit Expand Row!', row);
    this.table.rowDetail.collapseAllRows();
    this.editView = true;
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function(d) {
      return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.displayData = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  deleteConfirm(id){
    const conf = confirm('Do you want to Delete!!');
    if (conf) {
      console.log('yes' + id);
      this.deleteContacts(id);
    } else {
      console.log('no');
    }
  }
}
