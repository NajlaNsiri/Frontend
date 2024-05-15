import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Update this path as necessary

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss']
})
export class RestPasswordComponent implements OnInit {

  requestResetForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, // Use AuthService instead of HttpClient
    private router: Router
  ) { }

  ngOnInit() {
    this.requestResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      resetToken: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]] // Assuming a minimum length for passwords
    });
  }

  // Getters for form controls
  get fRequest() { return this.requestResetForm.controls; }
  get fReset() { return this.resetPasswordForm.controls; }

  onRequestReset() {
    if (this.requestResetForm.invalid) {
      return;
    }
    const email = this.requestResetForm.value.email;
    this.authService.requestResetPassword(email)
      .subscribe({
        next: (response) => {
          console.log('Reset link sent to your email:', response);
          this.router.navigate(['/account/restpasswordmessage']); // Navigate to a confirmation page if needed
        },
        error: (error) => {
          console.error('Failed to send reset link:', error);
          alert('Failed to send reset link. Please try again.');
        }
      });
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const resetData = {
      token: this.resetPasswordForm.value.resetToken,
      newPassword: this.resetPasswordForm.value.newPassword
    };
    this.authService.resetPassword(resetData)
      .subscribe({
        next: (response) => {
          console.log('Password reset successfully:', response);
          this.router.navigate(['/login']); // Redirect to login after successful password reset
        },
        error: (error) => {
          console.error('Reset password error:', error);
          alert('Failed to reset password. Please verify your token and try again.');
        }
      });
  }
}
