import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient ,private router: Router  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls;  }

  onSubmit() {
    // If form is invalid, return
    if (this.loginForm.invalid) {
      return;
    }
  
    // Send login request
    this.http.post<any>('http://localhost:4000/api/auth/signin', this.loginForm.value)
      .subscribe(
        (response) => {
          console.log('API Response:', response); // Log the full response object

          // Store userId and token in localStorage
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('token', response.token);

          // Navigate to the 'demande' page and pass the user ID as a state or parameter
          this.router.navigate(['/account/demande'], { queryParams: { userId: response.userId } });
          this.error = ''; // Clear any previous errors
        },
        (error) => {
          console.error('API Error:', error);
          this.error = 'An error occurred. Please try again.'; // Display error message
        }
      );

  }
  
}
