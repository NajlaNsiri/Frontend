import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { EchantillonService } from '../echantillon.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
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
  typesEchantillons = [
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
  retours = [
    { display: 'After 60 days ($0.30/sample/month)', value: 'RETURN_60_DAYS' },
    { display: 'After 90 days ($0.15/sample/month)', value: 'RETURN_90_DAYS' },
    { display: 'After 3 months ($0.20/sample/month)', value: 'RETURN_3_MONTHS' },
    { display: 'After 30 days ($0.20/sample/month)', value: 'RETURN_30_DAYS' }
  ];
  
  disposers = [
    { display: 'Dispose after 60 days ($0.30/sample/month)', value: 'DISPOSE_60_DAYS' },
    { display: 'Analysis after 90 days ($0.15/sample/month)', value: 'ANALYSIS_90_DAYS' },
    { display: 'Dispose after 3 months ($0.20/sample/month)', value: 'DISPOSE_3_MONTHS' },
    { display: 'Dispose after 30 days ($0.20/sample/month)', value: 'DISPOSE_30_DAYS' }
  ];  
  priorites = [
    { display: 'Standard', value: 'STANDARD' },
    { display: 'Se précipiter', value: 'RUSH' },
  ];
  constructor(private fb: FormBuilder, private echantillonService: EchantillonService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.echantillonId = +params['echantillonId']; // Ensure it's a number
      this.initializeForm();
      this.loadExistingData();
    });
  }

  initializeForm(): void {
    this.echantillonForm = this.fb.group({
      echantillonId: [''],
      typeEchantillon: [''],
      nomEchantillon: [''],
      lieuPrelevement: [''],
      addressRetourner: [''], // New field
      dateFinPrelevement: [''],
      heureFinPrelevement: [''],
      priorite: [''],
      disposes: [''], // New field
      returns: [''], // New field
      commentairesInternes: [''],
      demandeId: [this.demandeId] // Adjusted for clarity, previously [this.demandeId,]
    });
  }

  loadExistingData(): void {
    const userId = localStorage.getItem('userId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
    this.loading = true;
    const existingData = localStorage.getItem('echantillonFormData');
    if (existingData) {
      const echantillons: Echantillon[] = JSON.parse(existingData);
      const echantillon = echantillons.find(e => e.echantillonId === this.echantillonId);
      if (echantillon) {
        this.echantillonForm.patchValue(echantillon);
        this.echantillons = echantillons;
      } else {
        console.error('No echantillon found with the id:', this.echantillonId);
      }
    }
    this.loading = false;
  }

  updateParamter(){
    this.loadExistingData();
    const formValue = this.echantillonForm.value;
    formValue.id = this.echantillons.length ? this.echantillons.length + 1 : 1;
    this.echantillons.push(formValue);
    localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
    this.router.navigate(['/account/ListParamter'], { queryParams: { echantillonId: formValue.id }});
  }
  
  onSubmit(): void {
    if (this.echantillonForm.valid) {
      const formData: Echantillon = this.echantillonForm.value;
      this.echantillons = this.echantillons.filter(e => e.echantillonId !== this.echantillonId);
      this.echantillons.push(formData);
      localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
      this.router.navigate(['/account/Listechantillon']);
      $('#exampleModalCenter').modal('hide');
    } else {
      console.error('Form is not valid');
    }
  }
}
