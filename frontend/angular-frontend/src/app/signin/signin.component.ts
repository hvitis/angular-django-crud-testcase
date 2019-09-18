import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    // Navigating to dashboard in case user is logged in
    if (this.api.userData) {
      this.router.navigate(["dashboard"]);
    }
  }

  signInAdmin(): void {
    // Log in function calling API service
    this.api.signInAdmin();
  }
}
