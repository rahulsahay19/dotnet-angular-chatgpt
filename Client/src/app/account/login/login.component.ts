import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { LoadingService } from 'src/app/core/services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private loadingService: LoadingService 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      // Call the loading service to show the spinner
      this.loadingService.loading();

      this.accountService.login({ email, password, rememberMe }).subscribe(
        (user) => {
          // Handle successful login, e.g., navigate to a dashboard or home page
          // Call the loading service to hide the spinner
          this.loadingService.idle();
        },
        (error) => {
          // Handle login error, e.g., display an error message
          // Call the loading service to hide the spinner
          this.loadingService.idle();
        }
      );
    }
  }
}
