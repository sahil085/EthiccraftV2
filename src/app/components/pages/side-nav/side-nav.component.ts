import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../page/page.menu';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
