import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import csc, {ICity, IState} from 'country-state-city';
import {CollegeService} from '../../services/college.service';
import {College} from '../../models/college';

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
    private collegeService: CollegeService
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
      if (!isNaN(this.membershipForm.value.state)) {
        this.membershipForm.value.state = this.stateList.filter((item) => {
          return item.id === this.membershipForm.value.state;
        })[0].name;
      }
    }
  }

  onStateChange = (value) => {
    this.cityList = csc.getCitiesOfState('' + value.id);
  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        this.collegeList = data;
      }
    );
  }

}
