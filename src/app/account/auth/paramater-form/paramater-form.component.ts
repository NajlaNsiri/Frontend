import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from '../parameter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parameter-form',
  templateUrl: './paramater-form.component.html',
  styleUrls: ['./paramater-form.component.scss']
})
export class ParameterFormComponent {
  parameterForm: FormGroup;
  echantillonId :Number;
  submitted = false;
  error = '';
  successmsg = false;
  messageError = '';
  constructor(
     private fb: FormBuilder,
     private parameterService: ParameterService ,
     private route: ActivatedRoute, 
     private router: Router) {}
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.echantillonId= +params['echantillonId'];
      });
    this.parameterForm = this.fb.group({
      name: ['', Validators.required],
      rdl: [null, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      unit: ['', Validators.required],
      echantillonId: [this.echantillonId]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.parameterForm.invalid) {
      return;
    }

    this.parameterService.createParameter(this.parameterForm.value).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.successmsg = true; 
        this.error = ''; 
        this.router.navigate(['/account/paramter'],);
      },
      (error) => {
        console.error('API Error:', error);
        this.error = 'An error occurred. Please try again.'; 
        this.successmsg = false; 
      }
    );
  }
}
