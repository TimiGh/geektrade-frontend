import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email: any = '';
  password: any = '';
  loginForm: FormGroup;

  errorMessage = {
    'email': [
      {type: 'required', message: 'Field is required'},
      {type: 'pattern', message: 'Email is not valid'}
    ],
    'password': [
      {type: 'required', message: 'Field is required'},
      {type: 'minlength', message: 'Password too short (5 characters min)'},
      {type: 'pattern', message: 'At least one uppercase [A-Z], lowercase [a-z] and number'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
        ],
        password: ['', Validators.compose([Validators.required, Validators.minLength(5),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
      }
    );
  }

  back(): void {
    this.router.navigate(['/']).then();
  }

  goToSignupPage(): void {
    this.router.navigate(['/signup']).then();
  }

  resetForm(): void {
    this.loginForm.reset();
  }

  loginUser() {
    const userData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    localStorage.setItem('userData', JSON.stringify(userData));

    this.router.navigate(['/']).then(() => {
      this.snackbar.open('Welcome back Trader!', 'X', {
        panelClass: 'success',
        verticalPosition: 'bottom',
        duration: 3500
      });
    })
  }
}

