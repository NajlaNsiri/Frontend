import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande.model';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { Parameter } from 'src/app/core/models/parameter.model';

@Component({
  selector: 'app-result-demande',
  templateUrl: './result-demande.component.html',
  styleUrls: ['./result-demande.component.scss']
})
export class ResultDemandeComponent implements OnInit {
  parameters: Parameter[] = [];  // Initialize as empty array
  demandes: Demande;      // If demandes is also an array, initialize it as well
  echantillons: Echantillon[] = [];  // Initialize as empty array
  echantillonId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.loadFormDataFromLocalStorage();
  }

  private loadFormDataFromLocalStorage() {
    const demandeData = localStorage.getItem('demandeFormData');
    const echantillonData = localStorage.getItem('echantillonFormData');
    const parameterData = localStorage.getItem('ListParamater');

    this.demandes = demandeData ? JSON.parse(demandeData) : [];
    this.echantillons = echantillonData ? JSON.parse(echantillonData) : [];
    this.parameters = parameterData ? JSON.parse(parameterData) : [];
    console.log(this.parameters);
  }
  getParametersByEchantillonId(echantillonId: number): Parameter[] {
    const param= this.parameters.filter(param => param.echantillonId == echantillonId);
    console.log(param, echantillonId);

    return param;
  }

  saveParameters(): void {
    if (this.echantillonId && this.parameters) {
      const url = `http://localhost:4000/api/parameters/${this.echantillonId}`;
      this.http.post(url, { parameters: this.parameters }).subscribe({
        next: (response) => {
          console.log('Parameters saved successfully', response);
          // Optionally redirect or perform additional actions upon success
        },
        error: (error) => {
          console.error('Error saving parameters', error);
        }
      });
    } else {
      console.error('Echantillon ID or Parameters are missing');
    }
  }
}
