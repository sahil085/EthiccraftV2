import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {CollegeService} from '../../../service/college.service';
import {ActivatedRoute} from '@angular/router';
import {College} from '../../../models/college';
import {CollegeService} from '../../../services/college.service';

@Component({
  selector: 'app-edit-college',
  templateUrl: './edit-college.component.html',
  styleUrls: ['./edit-college.component.css']
})
export class EditCollegeComponent implements OnInit {

  collegeFormGroup: FormGroup;
  collegeId: string;
  initialCollegeData: College;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private collegeService: CollegeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.collegeId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log(this.collegeId);
    this.collegeService.findCollegeById(this.collegeId).subscribe(data => {
      this.initialCollegeData = data;
    });

    this.collegeFormGroup = this.formBuilder.group({
      collegeName: ['', Validators.required],
      collegeAbbreviation: ['', Validators.required],
      universityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      comments: ['', Validators.required],
      faculty: ['', Validators.required],
      referencePersonName: ['', Validators.required],
      referencePersonContact: ['', Validators.required]
    });
  }

  submitForm() {
    this.loading = true;
    this.collegeService.updateCollegeInfo(this.initialCollegeData.id, this.collegeFormGroup.value).subscribe(() => {
      this.loading = false;
    });
  }

}
