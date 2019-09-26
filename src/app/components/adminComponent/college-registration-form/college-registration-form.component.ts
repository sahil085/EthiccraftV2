import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import csc from 'country-state-city';
import {CollegeService} from '../../../services/college.service';
import alert from 'sweetalert2';
import {AppUrl} from '../../../constants/AppUrl';


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
  stateList: any[] = [];
  cityList: any[] = [];
  name: string;
  designation: string;
  contact: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private collegeService: CollegeService
  ) { }

  ngOnInit() {
    this.collegeFormGroup = this.formBuilder.group({
      collegeName: [this.collegeName, Validators.required],
      collegeAbbreviation: [this.collegeAbbreviation, Validators.required],
      universityName: [this.universityName, Validators.required],
      address: [this.address, Validators.required],
      city: [this.city, Validators.required],
      state: [this.state, Validators.required],
      comments: [this.comments],
      faculty: [this.faculty, Validators.required],
      referenceList: this.formBuilder.array([this.createItem()], Validators.required)
    });

    this.stateList = csc.getStatesOfCountry('101');

  }

  createItem = () => {
    return this.formBuilder.group({
      name: [this.name, Validators.required],
      designation: [this.designation, Validators.required],
      contact: [this.contact, [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
  }

  get formArr() {
    return this.collegeFormGroup.get('referenceList') as FormArray;
  }

  addItem = () => {
    this.formArr.push(this.createItem());
  }

  deleteRow = (index: number) => {
    this.formArr.removeAt(index);
  }

  onStateChange = (value) => {
    if (value) {
      this.collegeFormGroup.get('city').setValue(null);
      this.cityList = csc.getCitiesOfState('' + value.id);
    } else {
      this.collegeFormGroup.get('city').setValue(null);
      this.cityList = [];
    }
  }

  submitForm = () => {
    if (this.collegeFormGroup.valid) {
      if (!isNaN(this.collegeFormGroup.value.state)) {
        this.collegeFormGroup.value.state = this.stateList.filter((item) => {
          return item.id === this.collegeFormGroup.value.state;
        })[0].name;
      }
      this.collegeService.registerCollege(this.collegeFormGroup.value).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            this.showToaster(data['errorMessage'], 'error');
          } else {
            this.showToaster(data['successMessage'], 'success');
            this.collegeFormGroup.reset();
            this.router.navigateByUrl(AppUrl.PAGE_PREFIX + AppUrl.VIEW_COLLEGE_ADMIN);
          }
        }
        ,
        err => {
          if (err.status === 400) {
            this.showToaster('Validation failed', 'error');

          } else {
            this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
        }
      );

    } else {
      this.collegeFormGroup.markAllAsTouched();
    }
  }


  showToaster = (message, type) => {
    alert.fire({
      title: message,
      type: type,
      timer: 1500
    });
  }
}
