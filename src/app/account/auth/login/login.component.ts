import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as toast from 'react-toastify'; // Import all named exports
import 'react-toastify/dist/ReactToastify.css';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient ,private router: Router ,private toastr: ToastrService ) { }

  ngOnInit() {
    localStorage.clear();
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
      this.router.navigate(['/account/Listdemande'], { queryParams: { userId: response.userId } });
      this.error = ''; // Clear any previous errors
    },
    (error) => {
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
