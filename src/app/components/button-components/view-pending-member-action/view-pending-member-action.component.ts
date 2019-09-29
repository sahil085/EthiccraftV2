import {Component, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {Member} from '../../../models/member';
import {MemberService} from '../../../services/member.service';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-view-pending-member-action',
  templateUrl: './view-pending-member-action.component.html',
  styleUrls: ['./view-pending-member-action.component.scss']
})
export class ViewPendingMemberActionComponent {

  params: any;

  constructor(private router: Router, private dialogService: NbDialogService, private memberService: MemberService) {

  }

  agInit(params: any): void {
    this.params = params;
  }

  viewMemberDetails(dialog: TemplateRef<Member>) {
    const rowData = this.params;
    this.dialogService.open(dialog, {context: rowData.data});
  }

  approveMember() {
    const rowData = this.params;
    this.memberService.approveOrDecline(rowData.data.id, true).subscribe((data) => {
        if (data.successMessage) {
          this.memberService.findAllPendingMembers().subscribe(data => {
            rowData.api.setRowData(data);
          });
          AppComponent.showToaster(data.successMessage, data.type);
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }
      },
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }


}
