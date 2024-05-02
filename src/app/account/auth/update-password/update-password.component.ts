import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;  // Ensure token is treated as a string

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fReset() { return this.resetPasswordForm.controls; }

  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const payload = {
      token: this.token, // Make sure this is correctly being captured from queryParams
      newPassword: this.resetPasswordForm.value.newPassword
    };
    this.http.post<any>('http://localhost:4000/api/auth/reset-password', payload)
      .subscribe({
        next: (response) => {
          alert('Your password has been successfully reset.');
          this.router.navigate(['/account/login']); // Redirect to login page
        },
        error: (error) => {
          alert('Failed to reset password. Please check your token or try again.');
          console.error('Password reset error:', error);
        }
      });
  }
}
