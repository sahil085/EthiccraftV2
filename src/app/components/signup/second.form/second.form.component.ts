import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import csc from 'country-state-city';

@Component({
  selector: 'app-second-form',
  templateUrl: './second.form.component.html',
  styleUrls: ['./second.form.component.css']
})
export class SecondFormComponent implements OnInit {

  @Input() secondFormGroup: FormGroup;
  public permanentStateList: any = [];
  public presentStateList: any = [];
  public permanentCityList: any = [];
  public presentCityList: any = [];

  constructor() {
  }

  ngOnInit() {
    this.permanentStateList = csc.getStatesOfCountry('101');
    this.presentStateList = csc.getStatesOfCountry('101');
    this.secondFormGroup.get('permanentAddress').get('country').setValue('India');
    this.secondFormGroup.get('presentAddress').get('country').setValue('India');
  }

  onPresentStateChange(value) {
    this.secondFormGroup.get('presentAddress').get('city').setValue(null);
    if (value) {
      this.presentCityList = csc.getCitiesOfState('' + value.id);
    } else {
      this.presentCityList = [];
    }
  }

  onPermanentStateChange(value) {
    this.secondFormGroup.get('permanentAddress').get('city').setValue(null);
    if (value) {
      this.permanentCityList = csc.getCitiesOfState('' + value.id);
    } else {
      this.permanentCityList = [];
    }
  }

  validateForm = () => {
    console.log(this.secondFormGroup.value);
    if (this.secondFormGroup.invalid) {
      console.log(this.secondFormGroup.value);
      this.secondFormGroup.markAllAsTouched();
    }
  }

}
