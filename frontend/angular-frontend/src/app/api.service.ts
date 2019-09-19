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
  messageService: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

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

  getUsers() {
    // Getting list of all the users, returns observable.
    return this.http.get(this.url + 'api/users', httpOptions);
  }

  addUser(firstNameInput, lastNameInput, ibanInput) {
    // Creating object for registering user with data from form.
    const userObject = {
      first_name: firstNameInput,
      last_name: lastNameInput,
      iban: ibanInput
    };
    return this.http.post(this.url + `api/users`, userObject, httpOptions);
  }

  editUser(userId, firstNameInput, lastNameInput, ibanInput, isOwn) {
    const userObject = {
      id: userId,
      first_name: firstNameInput,
      last_name: lastNameInput,
      iban: ibanInput,
      own: isOwn
    };
    console.log(userObject);
    return this.http.put(
      this.url + `api/users/${userId}`,
      userObject,
      httpOptions
    );
  }

  deleteUser(userId) {
    return this.http.delete(this.url + `api/users/${userId}`, httpOptions);
  }
}
