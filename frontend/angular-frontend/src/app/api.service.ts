import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userList: Object;
  url: string = 'http://testcase.rh-dev.eu:8000/';
  constructor(private http: HttpClient, private router: Router) {}

  listUsers() {
    return this.userList;
  }
  getUsers() {
    return this.http
      .get(this.url + 'api/users', httpOptions)
      .subscribe(apiData => (this.userList = apiData));
  }

  signInAdmin(authToken) {
    // Setting Token after obtaining from login.
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Token ${authToken}`
    );
    return this.http
      .get(this.url + `api/users`, httpOptions)
      .subscribe(usersList => {
        // Navigating to dashboard on successfull login.
        this.router.navigate(['dashboard']),
          // Saving recieved User data to save calls.
          (this.userList = usersList);
      });
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
