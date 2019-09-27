import {Component, OnInit} from '@angular/core';
import {College} from '../../../models/college';
import {CollegeService} from '../../../services/college.service';
import {ViewCollegeActionComponent} from '../../button-components/view-college-action/view-college-action.component';


@Component({
  selector: 'app-view-college',
  templateUrl: './view-college.component.html',
  styleUrls: ['./view-college.component.css']
})
export class ViewCollegeComponent implements OnInit {


  collegeList: College[] = [];
  columnDefs: any;
  private gridApi;
  private gridColumnApi;

  rowData: any;

  ngOnInit() {


  }

  constructor(private collegeService: CollegeService) {
    // active: true
    // address: "asd"
    // city: "Bahadurganj"
    // collegeAbbreviation: "asd"
    // collegeName: "asd"
    // comments: "asd"
    // faculty: "asd"
    // id: 1
    // referenceList: [{id: 1, name: "asd", contact: 9999999999, designation: "asd"}]
    // state: "5"
    // universityName: "asd"

this.createGrid();

  }

  createGrid() {
    this.columnDefs = [
      {headerName: 'College Name', field: 'collegeName', sortable: true, filter: true},
      {headerName: 'College Abbreviation', field: 'collegeAbbreviation', sortable: true, filter: true},
      {headerName: 'Faculty', field: 'faculty', sortable: true, filter: true},
      {headerName: 'State', field: 'state', sortable: true, filter: true},
      {headerName: 'City', field: 'city', sortable: true, filter: true},
      {headerName: 'Actions',
        cellRendererFramework: ViewCollegeActionComponent,
        field: 'action'
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });


    this.collegeService.findAllColleges().subscribe((data) => {
      this.collegeList = data;
      this.rowData = data;
    });
  }
}
