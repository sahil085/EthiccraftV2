import { Component, OnInit } from '@angular/core';
import {College} from '../../../models/college';
import {CollegeService} from '../../../services/college.service';

@Component({
  selector: 'app-view-college',
  templateUrl: './view-college.component.html',
  styleUrls: ['./view-college.component.css']
})
export class ViewCollegeComponent implements OnInit {

  collegeList: College[] = [];

  constructor(private collegeService: CollegeService) { }

  ngOnInit() {
    this.collegeService.findAllColleges().subscribe(data => {
      this.collegeList = data;
    });
  }
}
