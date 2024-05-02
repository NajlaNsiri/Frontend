import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private http: HttpClient, 
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

  // Getters for requestResetForm controls
  get fRequest() { return this.requestResetForm.controls; }

  // Getters for resetPasswordForm controls
  get fReset() { return this.resetPasswordForm.controls; }

  onRequestReset() {
    if (this.requestResetForm.invalid) {
      return;
    }
    const email = this.requestResetForm.value.email;
    this.http.get<any>(`http://localhost:4000/api/auth/request-reset-password?email=${email}`)
      .subscribe({
        next: (response) => {
          alert('Reset link sent to your email.');
          this.requestResetForm.reset();
        },
        // error: (error) => {
        //   alert('Failed to send reset link. Please try again.');
        //   console.error('Reset password request error:', error);
        // }
      });
  }

  
}
