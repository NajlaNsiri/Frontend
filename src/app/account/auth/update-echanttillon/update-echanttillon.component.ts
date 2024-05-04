import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { EchantillonService } from '../echantillon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-echanttillon',
  templateUrl: './update-echanttillon.component.html',
  styleUrls: ['./update-echanttillon.component.scss']
})
export class UpdateEchanttillonComponent implements OnInit {
  echantillonForm: FormGroup;
  echantillons: Echantillon[] = [];
  echantillonId: number;
  demandeId: number;
  submitted = false;
  loading: boolean = true;
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

  constructor(private fb: FormBuilder, private echantillonService: EchantillonService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.echantillonId = params['echantillonId'];
    });
  }

  ngOnInit(): void {
    this.echantillonForm = this.fb.group({
      id: '',
      gabarit: '',
      typeEchantillon: '',
      normeEchantillon: '',
      nomEchantillon: '',
      lieuPrelevement: '',
      dateFinPrelevement: '',
      heureFinPrelevement: '',
      priorite: '',
      commentairesInternes: '',
      demandeId: [this.demandeId,]
    });
    this.loadExistingData();
  }

  loadExistingData() {
    const existingData = localStorage.getItem('echantillonFormData');
    this.echantillons = existingData ? JSON.parse(existingData) : [];
    const echantillon = this.echantillons.find(e => e.echantillonId === this.echantillonId);

  // If a matching echantillon is found, patch the form values
  if (echantillon) {
    this.echantillonForm.patchValue(echantillon);
  }
  }
  updateParamter(){
    this.loadExistingData();
    const formValue = this.echantillonForm.value;
    formValue.id = this.echantillons.length ? this.echantillons.length + 1 : 1;
    this.echantillons.push(formValue);
    localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
    this.router.navigate(['/account/ListParamter'], { queryParams: { echantillonId: formValue.id }});
  }
  
  onSubmit() {
    if (this.echantillonForm.valid) {
      const formData = this.echantillonForm.value;
      const index = this.echantillons.findIndex(e => e.echantillonId === formData.id);
      if (index !== -1) {
        this.echantillons[index] = formData;
      } else {
        this.echantillons.push(formData);
      }
      localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
      this.router.navigate(['/account/Listechantillon']);  // Adjust the route as needed
    } else {
      console.error('Form is not valid');
    }
  }
}
