import {Component} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import alert from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'neb-theme';
  currentTheme = 'default';
  isLoggedIn = true;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  public static showToaster = (message, type) => {
    alert.fire({
      title: message,
      type: type
    });
  }

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.isLoggedIn = !this.isLoggedIn;
  }


}
