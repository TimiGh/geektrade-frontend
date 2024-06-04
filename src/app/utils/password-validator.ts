import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = (control.get('password')?.value ?? control.get('new_password')?.value);
  const confirmPassword = control.get('confirm_password')?.value;

  if (password != confirmPassword) {
    return {
      passwordMatchError: true
    };
  }

  return null;
}

