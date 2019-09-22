import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export class CustomValidators {

  static checkPasswords: ValidatorFn = (group: FormGroup) => { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  static numeric(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === '') {
      return null;
    }
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      return {invalidNumber: true};
    }
    return null;
  }
}
