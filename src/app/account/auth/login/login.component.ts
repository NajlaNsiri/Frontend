import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    // If form is invalid, return
    if (this.loginForm.invalid) {
      return;
    }

    // If form is valid, send data to API
    this.http.post<any>('http://localhost:4000/api/auth/signin', this.loginForm.value)
      .subscribe(
        (response) => {
          console.log('API Response:', response);
          // Handle success response here
          this.error = ''; // Clear any previous errors
        },
        (error) => {
          console.error('API Error:', error);
          // Handle error response here
          this.error = 'An error occurred. Please try again.'; // Display error message
        }
      );
  }
}
