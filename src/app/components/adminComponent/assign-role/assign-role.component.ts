import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {College} from '../../../models/college';
import {UserRoleCollegeMappingDTO} from '../../../models/UserRoleCollegeMappingDTO';
import {UserRoleCollegeMapping} from '../../../models/UserRoleCollegeMapping';
import {AssignRoleService} from '../../../services/assign-role.service';
import {CollegeService} from '../../../services/college.service';
import {Role} from '../../../constants/Role';
import alert from 'sweetalert2';
import {NbSelectModule} from '@nebular/theme';
import {ViewPendingMemberActionComponent} from '../../button-components/view-pending-member-action/view-pending-member-action.component';
import {ViewAssignRoleActionComponent} from '../../button-components/view-assign-role-action/view-assign-role-action.component';


@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  providers: [NbSelectModule]
})
export class AssignRoleComponent implements OnInit {

  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  assignRoleForm: FormGroup;
  updateColleges: any = [];
  emails: string[] = [];
  roles: string[] = [];
  collegeList: College[] = [];
  userRoleCollegeMappingList: UserRoleCollegeMappingDTO[] = [];
  userRoleCollegeMapping: UserRoleCollegeMapping;

  constructor(private roleService: AssignRoleService,
              private collegeService: CollegeService,
              private formBuilder: FormBuilder
  ) {
    this.roles = Role.getAllRoles();
  }

  ngOnInit() {

    this.assignRoleForm = this.formBuilder.group({
      username: ['', Validators.required],
      userRole: ['', Validators.required],
      colleges: [[], Validators.required]
    });
    this.fetchAllEmails();
    this.fetchActiveCollege();
    this.findAllUserRole();
    this.createGrid();
  }

  createGrid() {
    this.columnDefs = [
      {
        headerName: 'User Name', field: 'userName',
        sortable: true, filter: true
      },
      {headerName: 'Email ID', field: 'userEmail', sortable: true, filter: true},
      {headerName: 'Role', field: 'role', sortable: true, filter: true},
      {headerName: 'College', field: 'collegeName', sortable: true, filter: true},
      {
        headerName: 'Actions',
        field: 'action',
        cellRendererFramework: ViewAssignRoleActionComponent,
      }
    ];
  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        this.collegeList = data;
      }
    );
  }

  fetchAllEmails() {
    this.roleService.getAllEmails().subscribe(data => {
      this.emails = data;
    });
  }

  submitForm = () => {
    if (this.assignRoleForm.get('username').value && this.assignRoleForm.get('userRole').value) {
      const userRoleCO = {
        username: this.assignRoleForm.get('username').value,
        role: this.assignRoleForm.get('userRole').value,
        colleges: this.assignRoleForm.get('colleges').value || []
      };
      this.roleService.assignRole(userRoleCO).subscribe(data => {
        if (data.successMessage !== null) {
          this.showToaster(data.successMessage, data.type);
          this.assignRoleForm.reset();
          this.findAllUserRole();
        } else {
          this.showToaster(data.errorMessage, data.type);
        }

      });
    }
  }



  findAllUserRole = () => {
    this.roleService.findAllUserRole().subscribe(data => {
      this.userRoleCollegeMappingList = data;
    });
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

  showToaster = (message, type) => {
    alert.fire({
      title: message,
      type: type,
      timer: 1500
    });
  }
}
