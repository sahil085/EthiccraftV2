import { Component, OnInit } from '@angular/core';
import {Member} from '../../../models/member';
import {AppComponent} from '../../../app.component';
import {MemberService} from '../../../services/member.service';
declare let $: any;

@Component({
  selector: 'app-view-camembers',
  templateUrl: './view-camembers.component.html',
  styleUrls: ['./view-camembers.component.css']
})
export class ViewCAMembersComponent implements OnInit {

  membersList: Member[];

  constructor(public memberService: MemberService) { }

  ngOnInit() {
  }

  findAllMembersOfCA() {
    // this.memberService.findAllPendingMembers().subscribe(
    //   (data) => {
    //     this.membersList = data;
    //   }
    //   ,
    //   err => {
    //     AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
    //   }
    // );
  }

}
