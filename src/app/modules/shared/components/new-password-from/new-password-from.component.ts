import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-from.component.html',
  styleUrls: ['./new-password-from.component.css'],
})
export class NewPasswordFromComponent implements OnInit {
  password: string;
  confirmPassword: string;
  resetForm: FormGroup;
  @Output() submitEvent = new EventEmitter<string>();

  constructor() {
    this.resetForm = new FormGroup({
      password : new FormControl(this.password, [Validators.required,  Validators.minLength(6)]),
      confirmPasswordForm : new FormControl(
        this.confirmPassword,
        [this.passwordValidator()])});
  }

  ngOnInit() {

  }
  submit() {
    this.submitEvent.emit(this.password);
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} => {

      return control.value !== this.password ? {notMatch: 'Password Does not match'} : null;
    };
  }

}
