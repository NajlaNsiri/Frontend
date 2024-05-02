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
  loading :boolean;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router  // Router injected here
  ) {}

  ngOnInit(): void {
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
        localStorage.setItem('demandeFormData', JSON.stringify(this.demandeForm.value));
        this.router.navigate(['/account/echantillon'],);
  }
  
}
