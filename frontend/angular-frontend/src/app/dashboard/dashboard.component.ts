import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ibanEditError: boolean;
  constructor(private api: ApiService) {}
  users;
  newUser = {};
  isSubmitted = false;
  formError;
  ngOnInit() {
    // Getting users from API on entering component (e.g. reloading the page)
    this.getUsers();
    this.api.autoLogin();
  }

  editUser(event) {
    // Editing users on the API endpoint
    if (event.own) {
      this.api
        .editUser(
          event.id,
          event.first_name,
          event.last_name,
          event.iban,
          event.own
        )
        .subscribe(
          data => (
            console.log('This field was edited!', data),
            (this.ibanEditError = false)
          ),
          error => (
            console.log('This field was not edited!', error),
            (this.ibanEditError = true)
          )
        );
    } else {
      console.log('You do not have permission.');
    }
  }

  deleteUser(userId) {
    // Deleting user from DB using API and from local data
    this.users = this.users.filter(el => !(el.id === userId));
    this.api.deleteUser(userId).subscribe();
  }

  getUsers(): void {
    // Getting all users from API
    this.api.getUsers().subscribe(usersList => {
      (this.users = usersList), console.log(this.users);
    });
  }

  // Adding new user
  addUser(userNames, iban): void {
    // Checking if forms are valid
    if (userNames.form.status === 'VALID' && iban.control.status === 'VALID') {
      // Changing error status in case was true.
      this.formError = false;
      // Using API service to register the user.
      this.api
        .addUser(
          userNames.form.value.first_name,
          userNames.form.value.last_name,
          iban.model
        )
        // Getting users for listing after successful adding new user
        .subscribe(response => this.getUsers());
    } else {
      // Raising alert in case forms are empty (both are required).
      this.formError = true;
    }
  }

  signOutAdmin(): void {
    // Signing out, cleaning localstorage.
    this.api.signOutAdmin();
  }
}
