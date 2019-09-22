import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-fourth-form',
  templateUrl: './fourth.form.component.html',
  styleUrls: ['./fourth.form.component.css']
})
export class FourthFormComponent implements OnInit {

  @Input() fourthFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
