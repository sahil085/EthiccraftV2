import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import csc, {ICity, IState} from 'country-state-city';
import {CollegeService} from '../../services/college.service';
import {College} from '../../models/college';
import alert from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MemberService} from '../../services/member.service';
import {AppComponent} from '../../app.component';

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
  newCollegeEntry: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private ngxService: NgxUiLoaderService,
    private memberService: MemberService
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
      unRegisteredCollege: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });

    this.fetchActiveCollege();
  }

  register = () => {
    if (this.membershipForm.invalid) {
      this.membershipForm.markAllAsTouched();
    } else {
      const taskId = new Date().getTime().toString();
      if (!isNaN(this.membershipForm.value.state)) {
        this.membershipForm.value.state = this.stateList.filter((item) => {
          return item.id === this.membershipForm.value.state;
        })[0].name;
      }
      this.memberService.quickRegister(this.membershipForm.value).subscribe(
        data => {
          this.membershipForm.reset();
          if (data.successMessage) {
              AppComponent.showToaster(data.successMessage, data.type);
            } else {
              AppComponent.showToaster(data.errorMessage, data.type);
            }
        }, err => {
          this.membershipForm.reset();
          AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
        }
      );
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

  setOtherCollege(value) {
    console.log(value);
    this.newCollegeEntry = value.id === 0;
    if (this.newCollegeEntry) {
      this.membershipForm.get('unRegisteredCollege').enable();
      this.membershipForm.get('unRegisteredCollege').setValue(value.unRegisteredCollege);
    } else {
      this.membershipForm.get('unRegisteredCollege').disable();
    }
  }

  addCustomCollege = (term) => ({
    id: 0,
    unRegisteredCollege: term,
    collegeName: term
  })

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
