import {Component, OnInit} from '@angular/core';
import {Member} from '../../models/member';
import {AppComponent} from '../../app.component';
import {MemberService} from '../../services/member.service';

declare let $: any;

@Component({
  selector: 'app-pending-members',
  templateUrl: './pending-members.component.html',
  styleUrls: ['./pending-members.component.css']
})
export class PendingMembersComponent implements OnInit {


  membersList: Member[] = [];

  constructor(public memberService: MemberService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.findAllPendingMembers();
  }

  findAllPendingMembers() {
    this.memberService.findAllPendingMembers().subscribe(
      (data) => {
        this.membersList = data;
      }
      ,
      err => {
        // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  approveOrDeclineMember(member: Member, approveStatus: boolean) {
    this.memberService.approveOrDecline(member.id, approveStatus).subscribe((data) => {
        if (data.successMessage) {
          // AppComponent.showToaster(data.successMessage, data.type);
          member.memberApproved = approveStatus;
        } else {
          // AppComponent.showToaster(data.errorMessage, data.type);
        }
      },
      err => {
        // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

}
