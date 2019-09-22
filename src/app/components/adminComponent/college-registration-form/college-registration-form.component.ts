import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppComponent} from '../../../app.component';
import csc from 'country-state-city';
import {CollegeService} from '../../../services/college.service';


@Component({
  selector: 'app-college-registration-form',
  templateUrl: './college-registration-form.component.html',
  styleUrls: ['./college-registration-form.component.css']
})
export class CollegeRegistrationFormComponent implements OnInit {

  collegeFormGroup: FormGroup;
  collegeName: string;
  collegeAbbreviation: string;
  universityName: string;
  address: string;
  city: string;
  state: string;
  comments: string;
  faculty: string;
  referencePersonName: string;
  referencePersonContact: number;
  stateList: any[] = [];
  cityList: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private collegeService: CollegeService
  ) { }

  ngOnInit() {
    this.collegeFormGroup = this._formBuilder.group({
      collegeName: [this.collegeName, Validators.required],
      collegeAbbreviation: [this.collegeAbbreviation, Validators.required],
      universityName: [this.universityName, Validators.required],
      address: [this.address, Validators.required],
      city: [this.city, Validators.required],
      state: [this.state, Validators.required],
      comments: [this.comments],
      faculty: [this.faculty, Validators.required],
      referencePersonName: [this.referencePersonName, Validators.required],
      referencePersonContact: [this.referencePersonContact, Validators.required]
    });

    this.stateList = csc.getStatesOfCountry('101');

  }

  onStateChange(event) {
    this.cityList = csc.getCitiesOfState('' + event.value);
  }

  submitForm = () => {
    console.log(this.collegeFormGroup.value);
    if (this.collegeFormGroup.valid) {
      this.collegeService.registerCollege(this.collegeFormGroup.value).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            // AppComponent.showToaster(data['errorMessage'], 'error');
          } else {
            // AppComponent.showToaster(data['successMessage'], 'success');
          }
        }
        ,
        err => {
          if (err.status === 400) {
            // AppComponent.showToaster('Validation failed', 'error');

          } else {
            // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
        }
      );

    }
  }


  showToaster = (message, type) => {
  //   Swal({
  //     title: message,
  //     type: type,
  //     timer: 1500
  //   });
  }
}
