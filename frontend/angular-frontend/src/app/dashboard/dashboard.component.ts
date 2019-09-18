import { Component, OnInit } from "@angular/core";
import { AuthService } from "angularx-social-login";
import { ApiService } from "../api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private api: ApiService) {}
  users: any;
  ngOnInit() {
    // Getting users from API on entering component (e.g. reloading the page)
    this.getUsers();
  }

  getUsers(): void {
    // Getting users from API
    this.api.getUsers().subscribe(usersList => (this.users = usersList));
  }

  registerUser(): void {
    // Registering user to API
    this.api.registerUser("john", "doe", "fakeIban");
  }

  signOutAdmin(): void {
    // Signing out, cleaning localstorage.
    this.api.signOutAdmin();
  }
}
