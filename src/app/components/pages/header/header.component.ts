import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/security/authentication.service';
import {NbSidebarService, NbThemeService} from '@nebular/theme';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();


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

  currentTheme = 'default';

  constructor(private sidebarService: NbSidebarService,
              private authService: AuthenticationService,
              private themeService: NbThemeService,
              private router: Router
              ) { }

  ngOnInit() {

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  logout() {
    this.authService.logOut();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  navigateHome() {
    this.router.navigateByUrl('');
  }
}
