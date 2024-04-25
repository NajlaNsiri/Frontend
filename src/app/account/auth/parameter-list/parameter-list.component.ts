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
  parameters: Parameter[];
  echantillonId :Number;
  analytesList= [
    { name: "Li", rdl: 15, unit: "ppm" },
    { name: "Al", rdl: 100, unit: "ppm" },
    { name: "Ca", rdl: 100, unit: "ppm" },
    { name: "Fe", rdl: 500, unit: "ppm" },
    { name:  "K" ,rdl: 1000, unit: "ppm" },
    { name: "Mg", rdl: 100, unit: "ppm" },
    { name: "Mn", rdl: 3, unit: "ppm" },
    { name: "P", rdl: 100, unit: "ppm" },
    { name:"S", rdl: 100, unit: "ppm" },
    { name:"Si", rdl: 100 ,unit: "ppm" },
    { name: "As", rdl: 5, unit: "ppm" },
    { name: "B", rdl: 10, unit: "ppm" },
    { name: "Ba", rdl: 5, unit: "ppm" },
    { name: "Be", rdl: 0.1, unit: "ppm" },
    { name: "Co", rdl: 0.5, unit: "ppm" },
    { name: "Cr", rdl: 24, unit: "ppm" },
    { name: "Cu", rdl: 2, unit: "ppm" },
    { name: "Ni", rdl: 10, unit: "ppm" },
    { name: "Pb", rdl: 0.8, unit: "ppm" },
    { name:"Sc", rdl: 17, unit: "ppm" },
    { name: "Bi", rdl: 0.3, unit: "ppm" },
    { name: "Cd", rdl: 3.3, unit: "ppm" },
    { name: "Cs", rdl: 0.1, unit: "ppm" },
    { name: "Ga", rdl: 0.5, unit: "ppm" },
    { name: "Rb", rdl: 0.6, unit: "ppm" },
    { name: "Sr", rdl: 3, unit: "ppm" },
    { name: "Tl", rdl: 0.4, unit: "ppm" },
    { name: "Ge", rdl: 0.7, unit: "ppm" },
    { name: "Mo", rdl: 1, unit: "ppm" },
    { name:"Nb",rdl: 2.5 ,unit: "ppm"},
    { name: "Sn", rdl: 0.5, unit: "ppm" },
    { name: "Ta", rdl: 0.2, unit: "ppm" },
    { name: "Ti", rdl: 100, unit: "ppm" },
    { name: "Ce", rdl: 0.8, unit: "ppm" },
    { name: "Dy", rdl: 0.4, unit: "ppm" },
    { name: "Er", rdl: 0.4, unit: "ppm" },
    { name:"Eu" , rdl:0.2, unit: "ppm" },
    { name:"Gd", rdl: 0.5, unit: "ppm" },
    { name:"Ho", rdl: 0.2, unit: "ppm" },
    { name: "In", rdl: 0.2, unit: "ppm" },
    { name:"La", rdl:3,  unit:"ppm" },
    { name:"Lu", rdl:0.5, unit: "ppm" },
    { name: "Nd", rdl: 1, unit: "ppm" },
    { name: "Pr", rdl: 0.5, unit: "ppm" },
    { name: "Sm", rdl: 0.5, unit: "ppm" },
    { name: "Tb", rdl: 0.5, unit: "ppm" },
    { name: "Th", rdl: 1, unit: "ppm" },
    { name: "Tm", rdl: 0.6, unit: "ppm" },
    { name: "U", rdl: 0.5, unit: "ppm" },
    { name: "V", rdl: 5, unit: "ppm" },
    { name: "Y", rdl: 0.5, unit: "ppm" },
    { name: "Yb", rdl: 0.5, unit: "ppm" }
  ]

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
    this.route.queryParams.subscribe(params => {
      this.echantillonId= +params['echantillonId'];
    });
    // this.getParameters();
  }
  submitAnalytes() {
    const serializedAnalytes = JSON.stringify(Array.from(this.selectedAnalytes));
    this.router.navigate(['/account/ResultParamter'], { queryParams: { parameters: serializedAnalytes, echantillonId:this.echantillonId } });
  }
  // getParameters(): void {
  //   this.parameterService.getParameters()
  //     .subscribe(parameters => this.parameters = parameters);
  // }

  // delete(parameterId:number,parameter: Parameter): void {
  //   this.parameterService.deleteParameter(parameterId)
  //     .subscribe(() => this.getParameters());
  // }
  // addParameter(parameter: Parameter):void{
  //   this.parameterService.createParameter(parameter)
  //   .subscribe(()=>this.getParameters());
  // }
}
