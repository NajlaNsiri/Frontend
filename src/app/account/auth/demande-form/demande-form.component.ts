import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemandeService } from '../demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      demandePour: ['', Validators.required],
      envoyeAuLaboratoire: ['', Validators.required],
      courrielsSupplementaires: [''],
      bonDeCommande: ['', Validators.required],
      langueDuCertificat: ['', Validators.required],
      commentairesInternes: [''],
      // userId: [this.userId, Validators.required]
    });
  }

  get form() {
    return this.demandeForm.controls;
  }

  onSubmit() {
    
    // Call your service or submit logic here
  }

  navigateToNext() {
    this.submitted = true; 
    if (this.demandeForm.valid) {
        localStorage.setItem('demandeFormData', JSON.stringify(this.demandeForm.value));
        this.router.navigate(['/account/Listechantillon']);
    } else {
      this.toastr.error('', 'validé votre demande form ', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
        console.error('The form is not valid and cannot proceed.');
        this.loading = false; // Stop any loading indicators
    }
}

}
