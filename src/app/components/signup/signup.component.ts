import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import csc from 'country-state-city';
import {CustomValidators} from '../../Validators';
import {College} from '../../models/college';
import {SignupService} from '../../services/signup.service';
import {CollegeService} from '../../services/college.service';
import alert from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  formData: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  email: any = '';
  password: any = '';
  collegeList: College[] = [];


  constructor(private router: Router, private route: ActivatedRoute,
              private signUpService: SignupService, private collegeService: CollegeService,
              private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
    }, {validator: CustomValidators.checkPasswords});
    this.secondFormGroup = this._formBuilder.group({
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('[6-9]\\d{9}')
      ]],
      whatsappNumber: ['', [
        Validators.pattern('[6-9]\\d{9}')
      ]],
      permanentAddress: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      }),
      presentAddress: this._formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      }),
    });
    this.thirdFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      collegeId: ['', Validators.required],
      batch: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      achievements: [''],
      hobbies: [''],
      skills: [''],
      inspirationSource: [''],
      profilePic: ['']
    });

    this.fetchActiveCollege();
  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        this.collegeList = data;
      }
    );
  }


  submitForm = () => {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid || this.fourthFormGroup.invalid) {

    } else {
      this.formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.fourthFormGroup.value
      };
      console.log(this.formData);
      this.formData.collegeId = this.formData.collegeId * 1;
      const permanentStateId = this.formData.permanentAddress.state;
      const presentStateId = this.formData.presentAddress.state;
      this.formData.permanentAddress.state = csc.getStateById(permanentStateId).name;
      this.formData.presentAddress.state = csc.getStateById(presentStateId).name;
      console.log(this.formData);
      this.signUpService.signUp(this.formData).subscribe(
        (data) => {
          if (data['errorMessage'] !== null) {
            this.showToaster(data['errorMessage'], 'error');
          } else {
            this.showToaster(data['successMessage'], 'success');
          }
        },
        err => {
          if (err.status) {
            this.showToaster('Validation failed', 'error');

          } else {
            this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
        }
      );
    }


    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.get('email').markAsTouched();
      this.firstFormGroup.get('password').markAsTouched();
      return;
    }

  }

  showToaster(message, type) {
    alert.fire({
      title: message,
      type: type,
      timer: 1500
    });
  }
}
