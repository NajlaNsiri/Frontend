import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EchantillonService } from '../echantillon.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-echantillon-form',
  templateUrl: './echantillon-form.component.html',
  styleUrls: ['./echantillon-form.component.css']
})
export class EchantillonFormComponent {
  echantillonForm: FormGroup;
  demandeId :Number;
  submitted = false;
  error = '';
  successmsg = false;
  messageError = '';
  gabarits = [
    { display: 'B - Brine', value: 'B_BRINE' },
    { display: 'MW - Marine Water', value: 'MW_MARINE_WATER' },
    { display: 'W - Water', value: 'W_WATER' },
    { display: 'C - Ore Conc.', value: 'C_ORE_CONC' },
    { display: 'O - Other (specify)', value: 'O_OTHER_SPECIFY' },
    { display: 'P - Pulp', value: 'P_PULP' },
    { display: 'LS - Lake Sediment', value: 'LS_LAKE_SEDIMENT' },
    { display: 'HMC - Heavy Minerals Concentrate', value: 'HMC_HEAVY_MINERALS_CONCENTRATE' },
    { display: 'R - Rock', value: 'R_ROCK' },
    { display: 'CR - Crushed Rock', value: 'CR_CRUSHED_ROCK' },
    { display: 'DC - Drill Core', value: 'DC_DRILL_CORE' },
    { display: 'H - Humus', value: 'H_HUMUS' },
    { display: 'S - Soil', value: 'S_SOIL' },
    { display: 'V - Vegetation', value: 'V_VEGETATION' },
    { display: 'SS - Stream Sediment', value: 'SS_STREAM_SEDIMENT' }
];
  typesEchantillon = [
    { display: '-Analyse', value: 'ANALYSE' },
    { display: 'Roche', value: 'ROCHE' },
    { display: 'Concasser', value: 'CONCASSER' }
  ];
  priorites = [
    { display: 'Standard', value: 'STANDARD' },
    { display: '1 jour', value: 'UN_JOUR' },
    { display: '2 jours', value: 'DEUX_JOURS' },
    { display: '3 jours', value: 'TROIS_JOURS' }
];

 


constructor(private fb: FormBuilder ,
   private echantillonService: EchantillonService ,
   private route: ActivatedRoute, 
   private router: Router) {}
   
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.demandeId= +params['demandeId'];
  });
    this.echantillonForm = this.fb.group({
      gabarit: '',
      typeEchantillon: '',
      normeEchantillon: '',
      nomEchantillon: '',
      lieuPrelevement: '',
      dateFinPrelevement: '',
      heureFinPrelevement: '',
      priorite: '',
      commentairesInternes: '',
      demandeId:[this.demandeId,]
    });
  }

   onSubmit() {
    this.submitted = true;
    if (this.echantillonForm.invalid) {
      return;
    }

    this.echantillonService.createEchantillon(this.echantillonForm.value).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.successmsg = true; 
        this.error = ''; 
        this.router.navigate(['/account/paramter'], { queryParams: { echantillonId: response.echantillonId } });
      },
      (error) => {
        console.error('API Error:', error);
        this.error = 'An error occurred. Please try again.'; 
        this.successmsg = false; 
      }
    );
  }
}
