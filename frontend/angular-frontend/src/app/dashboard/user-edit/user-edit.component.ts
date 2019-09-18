import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: string;
  @Input() id: number;
  @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();

  editMode = false;
  constructor() {}

  ngOnInit() {}

  onFocusOut() {
    this.focusOut.emit([this.user, this.id]);
    console.log([this.user, this.id]);
  }
}
