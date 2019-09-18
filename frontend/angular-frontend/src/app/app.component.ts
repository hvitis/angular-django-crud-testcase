import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private authService: AuthService, private api : ApiService) { }


  getUsers(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (userData) => {
      this.api.getUsers(userData.idToken) ,
      console.log(userData)

    }).catch((error) => console.log(error))
  }


  registerAdmin(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (userData) => {
      this.api.registerAdmin(userData.idToken, userData.email, userData.id) ,
      console.log(userData)

    }).catch((error) => console.log(error))
  }

  registerUser(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (userData) => {
      this.api.registerUser(userData.idToken, ) ,
      console.log(userData)

    }).catch((error) => console.log(error))
  }

  signOut(): void {
    this.authService.signOut();
  }
}
