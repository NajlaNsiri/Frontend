import { Component, OnInit } from '@angular/core';
import { ParameterService } from '../parameter.service';
import { Parameter } from 'src/app/core/models/parameter.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent implements OnInit {
  parameters: Parameter[]=[];
  echantillonId :Number;
  ListParameters : Parameter[]=[];
  dup: boolean;

  selectedAnalytes: Set<any> = new Set();
  
  toggleAnalyteSelection(analyte: any) {
    if (this.selectedAnalytes.has(analyte)) {
      this.selectedAnalytes.delete(analyte);
    } else {
      this.selectedAnalytes.add(analyte);
    }
  }
  constructor(private parameterService: ParameterService, private router: Router , private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.echantillonId = params['echantillonId'];
      });
   }
  
  setSelectedAnalytes(analytes: Set<string>) {
    this.selectedAnalytes = analytes;
  }

  getSelectedAnalytes(): Set<string> {
    return this.selectedAnalytes;
  }
  ngOnInit() {
    this.getParameters();
  }
  getParameters() {
    this.parameterService.getParameters().subscribe({
      next: (parameters: Parameter[]) => {
        this.parameters = parameters; // Store the fetched parameters in the array
      },
      error: (error) => {
        console.error('Error fetching parameters:', error);
      }
    });
  }
  navigateToPrevious(){
    this.router.navigate(['/account/echantillon']);
  }
  submitAnalytes() {
  // Create the analytesWithIds from selectedAnalytes
  const analytesWithIds = Array.from(this.selectedAnalytes).map(analyte => ({
    ...analyte,
    echantillonId: this.echantillonId // Assuming each analyte should have the current echantillonId
  }));
  
  // Retrieve stored parameters from localStorage
  const storedParameters = localStorage.getItem('ListParameter');
  if (storedParameters) {
    // Parse the stored parameters and merge them with analytesWithIds
    const existingParameters = JSON.parse(storedParameters);
    let ListParamaters = [...existingParameters, ...analytesWithIds];
    console.log(ListParamaters);
    // Serialize the updated parameters array with embedded analytes
    const serializedParameters = JSON.stringify(ListParamaters);
    localStorage.setItem('ListParameter', serializedParameters);
  } else {
    // When there are no existing parameters, store just the analytesWithIds array
    // Optionally, wrap analytesWithIds in an object if needed for structure consistency
    const serializedParameters = JSON.stringify(analytesWithIds);
    localStorage.setItem('ListParameter', serializedParameters);
  }

  // Navigate after saving
  this.router.navigate(['/account/ResultParamter'], { queryParams: { echantillonId: this.echantillonId }});
}

  
}
