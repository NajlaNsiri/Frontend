import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Echantillon } from 'src/app/core/models/echantillon.model';

@Component({
  selector: 'app-list-echantillon',
  templateUrl: './list-echantillon.component.html',
  styleUrls: ['./list-echantillon.component.scss']
})
export class ListEchantillonComponent implements OnInit {
  form: FormGroup;
  echantillons: Echantillon[] = [];
  loading = true;
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
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadExistingData();
  }

  loadExistingData() {
    const existingData = localStorage.getItem('echantillonFormData');
    
    if (existingData) {
      this.echantillons = JSON.parse(existingData);
      this.echantillons.forEach((echantillon, index) => {
        this.form.addControl(`echantillon${index}`, this.fb.group({
          gabarit: [echantillon.gabarit, Validators.required],
          typeEchantillon: [echantillon.typeEchantillon, Validators.required],
          nomEchantillon: [{value: echantillon.nomEchantillon, disabled: true}],
          dateFinPrelevement: [{value: echantillon.dateFinPrelevement, disabled: true}],
          heureFinPrelevement: [{value: echantillon.heureFinPrelevement, disabled: true}],
          commentairesInternes: [{value: echantillon.commentairesInternes, disabled: true}]
        }));
      });
      console.log(this.echantillons);
    }
    this.loading = false;
  }

  navigateToListEchantillon() {
    this.router.navigate(['/account/echantillon']);
  }

  delete(index: number) {
    this.echantillons.splice(index, 1);
    localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
    this.form.removeControl(`echantillon${index}`);
  }

  onSubmit(index: number) {
    const formGroup = this.form.get(`echantillon${index}`) as FormGroup;
    if (formGroup.valid) {
      this.echantillons[index] = formGroup.getRawValue();
      localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
      this.router.navigate(['/account/ListParameter'], { queryParams: { dup: false, echantillonId: this.echantillons[index].echantillonId }});
    }
  }
}
