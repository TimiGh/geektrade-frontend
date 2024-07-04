import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../utils/password-validator";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {switchMap, tap} from "rxjs";

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
    private router: Router,
    private userService: UserService,
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.minLength(5),
        Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      confirm_password: ['', Validators.required],
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
    const data = {
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
    }
    this.userService.signup(data)
      .pipe(
        tap(() => localStorage.setItem('token', 'Basic ' + btoa([data.email, data.password].join(':')))),
        switchMap(() => this.userService.getProfile())
      )
      .subscribe();
  }

}
