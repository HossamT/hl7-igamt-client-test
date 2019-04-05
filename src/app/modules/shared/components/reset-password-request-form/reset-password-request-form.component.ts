import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.css'],
})
export class ResetPasswordRequestFormComponent implements OnInit {
  email: string;
  resetForm: FormGroup;
  @Output() submitEvent = new EventEmitter<string>();

  constructor() {
    this.resetForm = new FormGroup({
      email: new FormControl(this.email, [Validators.email, Validators.required]),
    });
  }

  ngOnInit() {

  }
  submit() {
    this.submitEvent.emit(this.email);
  }

}
