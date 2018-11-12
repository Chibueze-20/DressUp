import { Directive } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

// passwords must match
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const password = document.getElementById('password');
    const confirm = /([A-z]+[0-9]+|[0-9]+[A-z]+)([a-zA-Z0-9])?$/.test(control.value);
    return confirm ? null : {'forbiddenName': {value: 'password must have at least one number and letter'}};
  };
}


export function notRequiredButNotEmpty(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const password = document.getElementById('password');
    const confirm = control.value !== '' ;
    return confirm ? null : {'Empty': {value: 'can not be empty'}};
  };
}

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective {

  constructor() { }

}
