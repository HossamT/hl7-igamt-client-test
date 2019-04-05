import {AbstractControl, ValidatorFn} from '@angular/forms';

export function  passwordValidator(password: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: ValidatorError} => {

    return control.value !== password ? {notMatch: new ValidatorError('Password Does not match')} : null;
  };
}
export class ValidatorError {
  constructor(readonly message: string) {
  }
}
