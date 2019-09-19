import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: object;
  @Input() userField: string;
  @Input() fieldName: string;
  @Output() changedUser: EventEmitter<any> = new EventEmitter<any>();
  showIcon = false;
  editMode = false;

  constructor() {}

  ngOnInit() {}

  onFocusOut() {
    // Modyfying edited field in a user object
    this.user[this.fieldName] = this.userField;
    // Emitting changed user object to component for sending
    this.changedUser.emit(this.user);
  }
}
