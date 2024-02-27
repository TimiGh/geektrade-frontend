import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../utils/password-validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide1 = true;
  hide2 = true;
  email = '';
  password = '';
  confirmedPassword = '';
  signupForm: FormGroup;

  errorMessage = {
    'email': [
      {type: 'required', message: 'Field is required'},
      {type: 'pattern', message: 'Email is not valid'}
    ],
    'username': [
      {type: 'required', message: 'Field is required'},
      {type: 'minlength', message: 'Username too short (3 characters min)'},
    ],
    'password': [
      {type: 'required', message: 'Field is required'},
      {type: 'minlength', message: 'Password too short (5 characters min)'},
      {type: 'pattern', message: 'At least one uppercase [A-Z], lowercase [a-z] and number'}
    ],
    'confirm_password': [
      {type: 'required', message: 'Field is required'},
      {type: 'areEqual', message: 'Passwords are not the same'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.minLength(5),
        Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      confirm_password: new FormControl('', Validators.required),
      terms: [false, Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  back(): void {
    this.router.navigate(['/login']).then();
  }

  resetForm(): void {
    this.signupForm.reset();
  }

  signUp(): void {

  }

}
