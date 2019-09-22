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
  constructor() { }

  ngOnInit() {
    this.permanentStateList = csc.getStatesOfCountry('101');
    this.presentStateList = csc.getStatesOfCountry('101');
  }

  onPresentStateChange(event) {
    this.presentCityList = csc.getCitiesOfState('' + event.value);
  }
  onPermanentStateChange(event) {
    this.permanentCityList = csc.getCitiesOfState('' + event.value);
  }

}
