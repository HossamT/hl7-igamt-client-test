import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {RegistrationObject} from '../../../core/models/user/registration-object.class';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  notice = 'Application for the use ' +
    'of the IGAMT does not guarantee that' +
    ' the applicant will be granted approval ' +
    'for use by the National Institute of Standards' +
    ' and Technology (NIST).The IGAMT software is hosted' +
    ' on a NIST server, and your information will not be visible' +
    ' to users other than NIST staff and yourselves. Information provided' +
    ' in the IGAMT does not imply NIST endorsement of any particular product,' +
    ' service, organization, company, information provider, or content' +
    '. This software was developed at the NIST by employees of the Federal Government' +
    ' in the course of their official duties. Pursuant to title 17 Section 105 of the' +
    ' United States Code, this software is not subject to copyright protection and i' +
    's in the public domain. NIST assumes no responsibility whatsoever for its use' +
    ' by other parties, and makes no guarantees, expressed or implied, about its ' +
    'quality, reliability, or any other characteristic. We would appreciate ' +
    'acknowledgment if the software is used. The outcome of the use of IGAMT ' +
    'can be redistributed and/or modified freely provided that any derivative ' +
    'works bear some notice that they are derived from it, and any modified' +
    ' versions bear some notice that they have been modified.';
  signedConfidentialityAgreement = false;
  user: RegistrationObject = new RegistrationObject(null, null , null, null, false);

   registrationForm: FormGroup;
   confirmPassword: string;
   @Output() submitEvent = new EventEmitter<RegistrationObject>();

  constructor() {
    this.registrationForm = new FormGroup({
      fullname: new FormControl(this.user.fullname, [Validators.required] ),
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      username: new FormControl(this.user.username, [Validators.required,  Validators.minLength(4)]),
      password : new FormControl(this.user.password, [Validators.required,  Validators.minLength(4)]),
      confirm : new FormControl(
        this.confirmPassword,
        [this.passwordValidator()]),
      signedConfidentialityAgreement: new FormControl(
        this.user.signedConfidentialityAgreement,
        [this.signedConfidentialityAgreementValidator()] ),
    });
  }

  ngOnInit() {
  }
  signedConfidentialityAgreementValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      console.log(control.value);
      return !control.value ? {unsigned: {value: control.value}} : null;
    };
  }
  submit() {
    console.log(this.registrationForm);
    console.log(this.user);
    this.submitEvent.emit(this.user);
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { notMatch: string } => {

      return control.value !== this.user.password ? {notMatch: 'Password Does not match'} : null;
    };
  }
}
