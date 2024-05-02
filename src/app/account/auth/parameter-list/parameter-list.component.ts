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

  selectedAnalytes: Set<any> = new Set();

  toggleAnalyteSelection(analyte: any) {
    if (this.selectedAnalytes.has(analyte)) {
      this.selectedAnalytes.delete(analyte);
    } else {
      this.selectedAnalytes.add(analyte);
    }
  }
  constructor(private parameterService: ParameterService, private router: Router , private route: ActivatedRoute) { }
  
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
        console.log('Parameters fetched and stored:', this.parameters);
      },
      error: (error) => {
        console.error('Error fetching parameters:', error);
      }
    });
  }
  submitAnalytes() {
    const serializedAnalytes = JSON.stringify(Array.from(this.selectedAnalytes));
    localStorage.setItem('ListParamater', serializedAnalytes);
    this.router.navigate(['/account/ResultParamter'], );
  }
}
