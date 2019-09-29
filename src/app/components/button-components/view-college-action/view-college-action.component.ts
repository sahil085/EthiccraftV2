import {Component, Input, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {College} from '../../../models/college';

@Component({
  selector: 'app-view-college-action',
  templateUrl: './view-college-action.component.html',
  styleUrls: ['./view-college-action.component.scss']
})
export class ViewCollegeActionComponent {

   params: any;

  constructor(private router: Router, private dialogService: NbDialogService) {

  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  editCollege() {
    const rowData = this.params;
    this.router.navigate(['/page/admin/college/edit/' + rowData.data.id]);
  }


  viewCollegeDetails(dialog: TemplateRef<College>) {
    const rowData = this.params;
    this.dialogService.open(dialog, { context: rowData.data});
  }



}
