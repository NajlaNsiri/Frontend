import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  existingData : any;
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
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private toastr: ToastrService ) {
    this.form = this.fb.group({});
    
  }

  ngOnInit(): void {
    this.loadExistingData();
  }

  loadExistingData() {
    const userId = localStorage.getItem('userId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
    this.existingData = localStorage.getItem('echantillonFormData');
    
    if (this.existingData) {
      this.echantillons = JSON.parse(this.existingData);
      this.echantillons.forEach((echantillon, index) => {
        this.form.addControl(`echantillon${index}`, this.fb.group({
          typeEchantillon: [echantillon.typeEchantillon, Validators.required],
          nomEchantillon: [{value: echantillon.nomEchantillon, disabled: true}],
          dateFinPrelevement: [{value: echantillon.dateFinPrelevement, disabled: true}],
          heureFinPrelevement: [{value: echantillon.heureFinPrelevement, disabled: true}],
          commentairesInternes: [{value: echantillon.commentairesInternes, disabled: true}],
          lieuPrelevement: [{value: echantillon.lieuPrelevement, disabled: true}],
          addressRetourner: [{value: echantillon.addressRetourner, disabled: true}], // New field
          priorite: [{value: echantillon.priorite, disabled: true}],
          disposes: [{value: echantillon.disposes, disabled: true}], // New field
          returns: [{value: echantillon.returns, disabled: true}], // New field
        }));
      });
      console.log(this.echantillons);
    }
    this.loading = false;
  }

  navigateToListEchantillon() {
    this.router.navigate(['/account/echantillon']);
  }
  navigateToNext() {
    // Check if 'existingData' is not null, undefined, or an empty object
    if (this.existingData && Object.keys(this.existingData).length > 0) {
      this.router.navigate(['/account/ResultDemande']);
    } else {
      console.error('No existing data to proceed with navigation.');
      this.toastr.error('', 'Aucune  echantillon', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
      // Optionally, handle the situation when there's no data (e.g., display a message)
    }
  }
  
  navigateToPrevious(){
    this.router.navigate(['/account/demande']);
  }
  delete(index: number) {
    this.echantillons.splice(index, 1);
    localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
    this.form.removeControl(`echantillon${index}`);
  }
  update(echantillonId:number){
    this.router.navigate(['/account/updateechantillon'], { queryParams: { echantillonId: echantillonId }});
  }
  onSubmit(index: number) {
    const formGroup = this.form.get(`echantillon${index}`) as FormGroup;
    if (formGroup.valid) {
      if(this.existingData!=null){
        this.echantillons[index] = formGroup.getRawValue();
      localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
      this.router.navigate(['/account/ListParameter'], { queryParams: { dup: false, echantillonId: this.echantillons[index].echantillonId }});
      }
      else {
        this.toastr.error('Ajouter un échantillon ', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    }
  }
}
