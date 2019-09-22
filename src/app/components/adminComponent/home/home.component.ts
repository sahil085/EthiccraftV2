import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public  isLoggedIn: boolean;
  username: string;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
   this.isLoggedIn = this.auth.isLoggednIn();
  }

}
