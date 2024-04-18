import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  messageError='';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    // If form is valid, send data to API
    this.http.post<any>('http://localhost:4000/api/auth/signup', this.signupForm.value)
      .subscribe(
        (response) => {
          console.log('API Response:', response);
          this.successmsg = true;
          this.error = ''; // Clear any previous errors
        },
        (error) => {
          console.error('API Error:', error);
          this.error = 'An error occurred. Please try again.'; // Display error message
          this.successmsg = false; // Hide success message
        }
      );
  }
}
