import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private api: ApiService) {}

  ngOnInit() {}

  getUsers(): void {
    this.api.getUsers();
  }

  registerUser(): void {
    this.api.registerUser('john', 'doe', 'fakeIban');
  }

  signOut(): void {
    this.authService.signOut();
  }
}
