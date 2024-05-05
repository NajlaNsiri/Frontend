import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/core/models/demande.model';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { Parameter } from 'src/app/core/models/parameter.model';
import { DemandeService } from '../demande.service';
import { EchantillonService } from '../echantillon.service';

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
    private http: HttpClient,
    private demandeService: DemandeService,
    private echantillonService: EchantillonService
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
    this.linkParametersToEchantillons();
  }
  private linkParametersToEchantillons() {
    this.echantillons.forEach(ech => {
      // Filter parameters by echantillonId and map to get their IDs
      ech.parameterIds = this.parameters
        .filter(param => param.echantillonId == ech.echantillonId)
        .map(param => param.parameterId);
    });
    console.log(this.echantillons);
  }
  getParametersByEchantillonId(echantillonId: number): Parameter[] {
    const param= this.parameters.filter(param => param.echantillonId == echantillonId);
    return param;
  }

  saveDemande(): void {
    if (this.echantillonId && this.parameters && this.demandes) {
    const userId = localStorage.getItem('userId'); 
    this.demandes.userId = userId;
      this.demandeService.createDemande(this.demandes).subscribe({
        next: (response) => {
          console.log('Demande created successfully', response);
          const demandeId = response.demandeId;  // Extract the demandeId from the response
          console.log('Received Demande ID:', demandeId);
          this.saveEchantillon(demandeId);
        },
        error: (error) => console.error('Error creating demande', error)
      });
    } else {
      console.error('Required data is missing to create a demande');
    }
  }
  saveEchantillon(demandeId: number){
    this.echantillonService.createEchantillon(demandeId, this.echantillons).subscribe({
      next: (response) => {
        console.log('Batch of Echantillons sent successfully', response),
        this.router.navigate(['/account/Listdemande']);
      },
      error: (error) => console.error('Error sending batch of Echantillons', error)
    });
  }
  
}
