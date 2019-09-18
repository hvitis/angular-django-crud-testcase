import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {}

  signInAdmin(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.api.signInAdmin(userData.idToken), console.log(userData);
      })
      .catch(error => console.log(error));
  }
}
