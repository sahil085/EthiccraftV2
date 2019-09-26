import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {College} from '../../../models/college';
import {CollegeService} from '../../../services/college.service';
import csc from 'country-state-city';
import alert from 'sweetalert2';
import {AppUrl} from '../../../constants/AppUrl';

@Component({
  selector: 'app-edit-college',
  templateUrl: './edit-college.component.html',
  styleUrls: ['./edit-college.component.css']
})
export class EditCollegeComponent implements OnInit {

  collegeFormGroup: FormGroup;
  collegeId: string;
  loading = false;
  stateList: any[] = [];
  cityList: any[] = [];
  city: string;

  constructor(
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.stateList = csc.getStatesOfCountry('101');
    this.collegeId = this.activatedRoute.snapshot.paramMap.get('id');
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

  ngOnInit() {
    this.collegeFormGroup = this.formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: [''],
      faculty: ['', Validators.required],
      referenceList: this.formBuilder.array([], Validators.required)
    });

    this.collegeService.findCollegeById(this.collegeId).subscribe((data: College) => {
      console.log(data);
      const stateId = this.stateList[this.stateList.findIndex((state) => state.name === data.state)].id;
      this.cityList = csc.getCitiesOfState('' + stateId);
      console.log(this.cityList);
      const cityId = this.cityList[this.cityList.findIndex((city) => city.name === data.city)].id;
      this.city = data.city;
      this.collegeFormGroup.get('collegeName').setValue(data.collegeName);
      this.collegeFormGroup.get('collegeAbbreviation').setValue(data.collegeAbbreviation);
      this.collegeFormGroup.get('universityName').setValue(data.universityName);
      this.collegeFormGroup.get('address').setValue(data.address);
      this.collegeFormGroup.get('comments').setValue(data.comments);
      this.collegeFormGroup.get('faculty').setValue(data.faculty);
      this.collegeFormGroup.get('state').setValue('' + stateId);
      this.collegeFormGroup.get('city').setValue(data.city);
      this.populatedReferDetails(data);
      this.collegeFormGroup.get('referenceList').setValue(data.referenceList);
    });


  }

  populatedReferDetails(data: College) {
    data.referenceList.forEach(() => {
      const categorySelectionArray = this.collegeFormGroup.get('referenceList') as FormArray;
      categorySelectionArray.push(this.createItem());
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }


  get formArr() {
    return this.collegeFormGroup.get('referenceList') as FormArray;
  }

  addItem(): void {
    this.formArr.push(this.createItem());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  submitForm() {
    if (this.collegeFormGroup.valid) {
      this.loading = true;
      if (!isNaN(this.collegeFormGroup.value.state)) {
        this.collegeFormGroup.value.state = this.stateList.filter((item) => {
          return item.id === this.collegeFormGroup.value.state;
        })[0].name;
      }
      this.collegeService.updateCollegeInfo(this.collegeId, this.collegeFormGroup.value).subscribe((data) => {
          if (data['errorMessage'] !== null) {
            this.showToaster(data['errorMessage'], 'error');
          } else {
            this.showToaster(data['successMessage'], 'success');
            setTimeout(() => {
              this.loading = false;
              this.router.navigate([AppUrl.PAGE_PREFIX + AppUrl.VIEW_COLLEGE_ADMIN]);
            }, 2000);
          }
        }, err => {
          if (err.status === 400) {
            this.showToaster('Validation failed', 'error');

          } else {
            this.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
          this.loading = false;
        }
      );
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
