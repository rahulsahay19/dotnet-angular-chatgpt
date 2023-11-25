import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router'; 
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
    private router: Router,
    private route: ActivatedRoute 
  ) {
    // Get returnUrl from route parameters or default to '/'
    this.route.queryParams.subscribe(params => {
      this.accountService.redirectUrl = params['returnUrl'] || '/';
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loadingService.loading();
  
      this.accountService.login(this.loginForm.value).subscribe({
        next: (user) => { // user will be the emitted value from the Observable
          this.loadingService.idle();
          // Redirect to the stored returnUrl or to the store page if no returnUrl is available
          const redirect = this.accountService.redirectUrl ? this.accountService.redirectUrl : '/store';
          this.router.navigateByUrl(redirect); // Use navigateByUrl to handle complex URLs
          this.accountService.redirectUrl = null; // Clear the stored URL
        },
        error: () => {
          this.loadingService.idle();
          // Handle login error
        }
        // If there's a completion logic, you can include a complete property here
      });
    }
  }
}  