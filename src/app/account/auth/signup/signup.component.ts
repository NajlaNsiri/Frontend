import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required], // Changed from 'nom' to 'firstName'
      lastName: ['', Validators.required],  // Changed from 'prenom' to 'lastName'
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],  // Changed from 'motdepasse' to 'password'
      genre: ['', Validators.required],     // Added 'genre' field
      username: ['', Validators.required]   // Added 'username' field
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
          if (response.message) {
            console.log(response.message); // Success message from server
          }
          this.successmsg = true;
          this.error = '';
          this.router.navigate(['/account/validation']);  // Navigate when successful
        },
        error => {
          console.error('API Error:', error);
          this.messageError = error.error.message || 'An error occurred. Please try again.';  // Use error message from response if available
          this.successmsg = false;
        }
      );

  }
}
