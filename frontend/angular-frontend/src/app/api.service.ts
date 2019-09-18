import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers(authToken) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Token ${authToken}`);
    return this.http.get('http://testcase.rh-dev.eu:8000/api/users', httpOptions).subscribe(apiData => (console.log("Data from my API", apiData)));
  }

  registerAdmin(authToken, email, id) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Token ${authToken}`);
    return this.http.post((`http://testcase.rh-dev.eu:8000/api/users/`), {email: email}, httpOptions).subscribe(data => {
      console.log(data);
    });
  }


  registerUser(authToken) {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Token ${authToken}`);
  
    // first_name', 'last_name', 'iban
    let userObject = {first_name: "john", last_name: "Kowalsky", iban: "DE89370400440532013000"}

    return this.http.post((`http://testcase.rh-dev.eu:8000/api/users`), userObject, httpOptions).subscribe(data => {
      console.log(data);
});
  
  }

}
