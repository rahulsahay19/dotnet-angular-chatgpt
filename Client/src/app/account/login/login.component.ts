import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router'; 
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loadingService.loading();

      this.accountService.login(this.loginForm.value).subscribe(
        () => {
          // Handle successful login
          this.loadingService.idle();
          
          // Redirect to the store page
          this.router.navigate(['/store']);
        },
        () => {
          // Handle login error
          this.loadingService.idle();
        }
      );
    }
  }
}
