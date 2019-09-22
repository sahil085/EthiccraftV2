import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/security/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuService} from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public username: string;
  public password: string;
  public invalidMessage: string;
  public returnUrl: string;
  public isLoginSubmit = false;


  constructor(private router: Router, private route: ActivatedRoute,
              private authService: AuthenticationService,
              private fb: FormBuilder, private menuService: NbMenuService) {
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [this.username, [Validators.required, Validators.email]],
      password: [this.password, Validators.required]
    });


    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    console.log(this.route.snapshot.queryParams.returnUrl);
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }

  }

  login() {
    this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
      console.log('response ' + response);
      this.menuService.navigateHome(this.returnUrl);
      this.router.navigate([this.returnUrl]);
    });
  }

}
