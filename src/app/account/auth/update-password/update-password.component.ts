import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Update this path as necessary
import { ToastrService } from 'ngx-toastr';

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
    private authService: AuthService, // Use AuthService instead of HttpClient
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService 
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
    const resetData = {
      token: this.token, // Make sure this is correctly being captured from queryParams
      newPassword: this.resetPasswordForm.value.newPassword
    };
    this.authService.resetPassword(resetData)
      .subscribe({
        next: (response) => {
          console.log('Your password has been successfully reset:', response);
          this.toastr.success('Your password has been successfully reset :', '', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true
          });  
          this.router.navigate(['/account/login']); // Redirect to login page
        },
        error: (error) => {
          console.error('Failed to reset password:', error);
          alert('Failed to reset password. Please check your token or try again.');
        }
      });
  }
}
