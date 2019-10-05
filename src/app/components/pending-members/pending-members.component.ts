import {Component, OnInit} from '@angular/core';
import {Member} from '../../models/member';
import {AppComponent} from '../../app.component';
import {MemberService} from '../../services/member.service';
import {ViewPendingMemberActionComponent} from '../button-components/view-pending-member-action/view-pending-member-action.component';

declare let $: any;

@Component({
  selector: 'app-pending-members',
  templateUrl: './pending-members.component.html',
  styleUrls: ['./pending-members.component.css']
})
export class PendingMembersComponent implements OnInit {

  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  membersList: Member[] = [];

  constructor(public memberService: MemberService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.findAllPendingMembers();
    this.createGrid();
  }

  findAllPendingMembers() {
    this.memberService.findAllPendingMembers().subscribe(
      (data) => {
        this.membersList = data;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }


  createGrid() {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'fullName',
        cellRenderer: function (params) {
          if (!params.data) {
            return '';
          } else {
            return params.data.firstName + ' ' + params.data.middleName + ' ' + params.data.lastName;
          }

        },
        sortable: true, filter: true, resizable: true
      },
      {headerName: 'Email ID', field: 'email', sortable: true, filter: true, resizable: true},
      {headerName: 'Mobile Number', field: 'mobileNumber', sortable: true, filter: true, resizable: true},
      {headerName: 'Course', field: 'courseName', sortable: true, filter: true, resizable: true},
      {headerName: 'Batch', field: 'batch', sortable: true, filter: true, resizable: true},
      {headerName: 'College', field: 'college.collegeName', sortable: true, filter: true, resizable: true},
      {headerName: 'Un-Registered College', field: 'unRegisteredCollege', sortable: true, filter: true, resizable: true},
      {
        headerName: 'Actions',
        field: 'action',
        cellRendererFramework: ViewPendingMemberActionComponent,
        resizable: true
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    params.api.setGridAutoHeight(true);

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
        params.api.setGridAutoHeight(true);

      });
    });
  }




}
