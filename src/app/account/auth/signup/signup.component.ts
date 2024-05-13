import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router ,private toastr: ToastrService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required], // Changed from 'nom' to 'firstName'
      lastName: ['', Validators.required],  // Changed from 'prenom' to 'lastName'
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],  // Changed from 'motdepasse' to 'password'
      genre: ['', Validators.required],     // Added 'genre' field
      username: ['', Validators.required]  ,
      phoneNumber:['', Validators.required] // Added 'username' field
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.signupForm.invalid) {
      return;
    }
  
    this.http.post<any>('http://localhost:4000/api/auth/signup', this.signupForm.value)
    .subscribe(
    response => {
      console.log('API Response:', response);
      if (response.message && response.message.includes('User registered successfully')) {
        console.log('User registered successfully.'); // Log success message
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

      // Ensure you are displaying a meaningful error message
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      if (error.status === 400 && error.error === 'Email is already taken!') {
        errorMessage = 'This email is already registered. Please use a different email address.';
      }

      this.error = errorMessage; // Set the UI error message

      this.toastr.error(errorMessage, 'Login Failed', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
    }
  );

  }
  
}
