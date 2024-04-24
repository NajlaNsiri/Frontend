import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemandeService } from '../demande.service';
import { ActivatedRoute, Router } from '@angular/router'; // Include Router

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.scss']
})
export class DemandeFormComponent implements OnInit {
  demandeForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  messageError = '';
  userId: number;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router  // Router injected here
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
    });

    this.demandeForm = this.fb.group({
      demandePour: ['', Validators.required],
      envoyeAuLaboratoire: ['', Validators.required],
      courrielsSupplementaires: [''],
      bonDeCommande: ['', Validators.required],
      unEchantillon: [false],
      langueDuCertificat: ['', Validators.required],
      commentairesInternes: [''],
      userId: [this.userId, Validators.required] // Ensure userId is part of the form data
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.demandeForm.invalid) {
      return;
    }

    this.demandeService.createDemande(this.demandeForm.value).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.successmsg = true; // Set the success message
        this.error = ''; // Clear any previous errors
        // Navigate to '/account/echantillon' with demandeId
        this.router.navigate(['/account/echantillon'], { queryParams: { demandeId: response.demandeId } });
      },
      (error) => {
        console.error('API Error:', error);
        this.error = 'An error occurred. Please try again.'; // Display error message
        this.successmsg = false; // Indicate that the submission wasn't successful
      }
    );
  }
}
