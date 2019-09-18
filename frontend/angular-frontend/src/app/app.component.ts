import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  ngOnInit() {
    // Trying to login by checking localstorage on the top component
    this.api.autoLogin();
  }
}
