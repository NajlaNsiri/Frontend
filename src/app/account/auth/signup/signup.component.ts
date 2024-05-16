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
      username: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.toastr.error('Veuillez vérifier le formulaire pour les erreurs.', 'Formulaire invalide', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe(
      response => {
        if (response.message && response.message.includes('User registered successfully and activation email sent.')) {
          this.toastr.success('Utilisateur enregistré avec succès !', 'Succès', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
          this.router.navigate(['/account/validation']);
        } else {
          this.toastr.error('Une erreur inattendue est apparue. Veuillez réessayer.', 'Erreur inattendue', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
        }
      },
      error => {
        const errorMessage = error.error ? error.error : `Une erreur s"est produite. Veuillez réessayer.`;
        this.toastr.error(errorMessage, `Échec de l'inscriptio`, {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    );
  }
}
