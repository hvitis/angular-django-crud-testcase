import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private api: ApiService) {}
  users: any;

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
        .subscribe(data => console.log(data), error => console.log(error));
    } else {
      console.log('You did not create this user.');
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

  addUser(): void {
    // Registering user to API
    this.api
      .addUser('Remote2', 'User3', 'AD1200012030200359100100')
      .subscribe(response => this.getUsers());
  }

  signOutAdmin(): void {
    // Signing out, cleaning localstorage.
    this.api.signOutAdmin();
  }
}
