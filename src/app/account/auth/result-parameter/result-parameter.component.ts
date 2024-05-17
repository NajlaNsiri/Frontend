import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-parameter',
  templateUrl: './result-parameter.component.html',
  styleUrls: ['./result-parameter.component.scss']
})
export class ResultParameterComponent implements OnInit {
  parameters: any[];
  ListParameters: any[];
  echantillonId :Number;
  dup:boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    // public dialog: MatDialog // Inject MatDialog service
  ) { 
    this.route.queryParams.subscribe(params => {
      this.echantillonId = params['echantillonId'];
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getParametersFromLocalStorage();
    });
  }
  navigateToPrevious(){
    this.router.navigate(['/account/ListParamter'],{ queryParams: { echantillonId: this.echantillonId }});
  }
  private getParametersFromLocalStorage() {
    const userId = localStorage.getItem('userId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
    const storedParameters = localStorage.getItem('ListParameter');
    if (storedParameters) {
      this.parameters = JSON.parse(storedParameters);
      this.ListParameters = this.parameters.filter(param => param.echantillonId === this.echantillonId);
      console.log(this.ListParameters);
    } else {
      console.error('No parameters found in localStorage');
    }
  }
  deleteParameter(index: number): void {
    this.ListParameters.splice(index, 1);
  }

  submitRequest(): void {
      this.parameters = this.parameters.filter(param => param.echantillonId !== this.echantillonId);
      let concatenatedArray = [...this.parameters, ...this.ListParameters];
      localStorage.setItem('ListParamater', JSON.stringify(concatenatedArray));
      console.log(this.parameters);
      this.router.navigate(['/account/Listechantillon'], );
  }
}
