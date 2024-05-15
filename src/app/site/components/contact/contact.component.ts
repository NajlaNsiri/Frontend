import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/account/auth/services/auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup; // Define the FormGroup

  constructor(private authService: AuthService, private formBuilder: FormBuilder,private toastr: ToastrService,private router: Router ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfComplaint: ['', [Validators.required]],
      issueDescription: ['', [Validators.required]],
      contactPerson: ['']
    });
  }

  onSubmit(): void {
    console.log('test');
    if (this.contactForm.valid) {
      this.authService.createContact(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Contact saved', response);
          this.toastr.success("", 'Votre message envoyer avec success', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error saving contact', error);
          // Optionally handle errors here
        }
      });
    } 
    else {
      console.log('Validation failed');
      this.toastr.error("", 'verify votre form', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
    }
  }
}
