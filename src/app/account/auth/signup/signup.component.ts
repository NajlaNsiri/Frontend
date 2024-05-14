import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  messageError = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, // Use AuthService instead of HttpClient
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    // Use authService to submit signup data
    this.authService.signup(this.signupForm.value).subscribe(
      response => {
        console.log('API Response:', response);
        if (response.message && response.message.includes('User registered successfully and activation email sent.')) {
          console.log('User registered successfully and activation email sent.');
          this.successmsg = true;
          this.error = '';
          this.router.navigate(['/account/validation']); // Navigate to validation page
        } else {
          console.error('Unexpected success response:', response);
          this.error = 'An unexpected error occurred. Please try again.';
          this.toastr.error('An unexpected error occurred. Please try again.', 'Unexpected Error', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
        }
      },
      error => {
        console.error('API Error:', error);
        let errorMessage = 'An error occurred. Please try again.'; // Default error message

        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.status === 400 && error.error) {
          errorMessage = error.error;
        }

        this.error = errorMessage; // Set the UI error message
        this.toastr.error(errorMessage, 'Signup Failed', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    );
  }
}
