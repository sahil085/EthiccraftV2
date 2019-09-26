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


@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  providers: [NbSelectModule]
})
export class AssignRoleComponent implements OnInit {

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

  update() {
    if (this.updateColleges.length > 0) {
      const userRoleCO = {
        id: this.userRoleCollegeMapping.id,
        username: this.userRoleCollegeMapping.user.email,
        role: this.userRoleCollegeMapping.role.role,
        colleges: this.updateColleges || []
      };
      this.roleService.updateUserRoleCollegeMapping(userRoleCO).subscribe(data => {
        if (data.successMessage !== null) {
          this.showToaster(data.successMessage, data.type);
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

  deleteUserRole = (id) => {

    alert.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the user role ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.roleService.deleteUserRole(id).subscribe(data => {
          if (data.successMessage !== null) {
            this.showToaster(data.successMessage, data.type);
          } else {
            this.showToaster(data.errorMessage, data.type);
          }
          this.findAllUserRole();
        });
      }
      // else if (result.dismiss === alert.fire().DismissReason.cancel) {
      //   alert.fire(
      //     'Cancelled',
      //     'Operation canceled)',
      //     'error'
      //   );
      // }
    });

  }


  editUserRoleMapping(id) {

    this.roleService.findUserRoleById(id).subscribe(data => {
      this.userRoleCollegeMapping = data;
      this.updateColleges = this.userRoleCollegeMapping.collegeList.map(data1 => data1.id);
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
