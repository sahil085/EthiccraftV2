import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import csc, {ICity, IState} from 'country-state-city';
import {CollegeService} from '../../services/college.service';
import {College} from '../../models/college';
import alert from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  membershipForm: FormGroup;
  stateList: IState[] = [];
  cityList: ICity[] = [];
  collegeList: College[] = [];
  genderList: string[];

  constructor(
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private ngxService: NgxUiLoaderService
  ) {
    this.stateList = csc.getStatesOfCountry('101');
    this.genderList = ['Male', 'Female'];
  }

  ngOnInit() {

    this.membershipForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      college: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });

    this.fetchActiveCollege();
  }

  register = () => {
    if (this.membershipForm.invalid) {
      this.membershipForm.markAllAsTouched();
    } else {
      const taskId = new Date().getTime().toString();
      this.ngxService.startLoader('childLoader', taskId);
      if (!isNaN(this.membershipForm.value.state)) {
        this.membershipForm.value.state = this.stateList.filter((item) => {
          return item.id === this.membershipForm.value.state;
        })[0].name;
      }
      this.membershipForm.value.contact = parseInt(this.membershipForm.value.contact, 10);
      console.log(this.membershipForm.value);
      this.ngxService.stopLoader('childLoader', taskId);
      this.membershipForm.reset();
    }
  }

  onStateChange = (value) => {
    if (value) {
      this.membershipForm.get('city').setValue(null);
      this.cityList = csc.getCitiesOfState('' + value.id);
    } else {
      this.membershipForm.get('city').setValue(null);
      this.cityList = [];
    }
  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        this.collegeList = data;
      }
    );
  }

  showToaster = (message, type) => {
    alert.fire({
      title: message,
      type: type,
      timer: 1500
    });
  }

}
