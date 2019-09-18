import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  usersList: Object;
  userData: Object = null;
  url: string = environment.urlHeroku;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getUsers() {
    return this.http.get(this.url + 'api/users', httpOptions);
  }

  userIsLogged() {
    // Returning true or false for AuthGuard
    return !!this.userData;
  }

  autoLogin() {
    // Parsing string into a userAuth object from localstorage
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth) {
      return;
    }
    // Setting token to headers for API calls
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Token ${userAuth.idToken}`
    );
    return (this.userData = userAuth);
  }

  signInAdmin() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        // Setting Token after obtaining from login.
        this.userData = userData;
        // Saving user Authentication Data to local storage
        localStorage.setItem('userAuth', JSON.stringify(userData));

        httpOptions.headers = httpOptions.headers.set(
          'Authorization',
          `Token ${userData.idToken}`
        );
        // Simplified signIn method
        return this.router.navigate(['dashboard']);
      })
      .catch(error => console.log(error));
  }

  signOutAdmin() {
    // Cleaning all data and localstorage and navigating to login
    this.userData = null;
    this.usersList = null;
    localStorage.clear();
    return this.router.navigate(['/signin']);
  }

  registerUser(firstNameInput, lastNameInput, ibanInput) {
    // Creating object for registering user with data from form.
    const userObject = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      iban: ibanInput
    };

    return this.http
      .post(this.url + `api/users`, userObject, httpOptions)
      .subscribe(data => {
        console.log(data);
      });
  }
}
