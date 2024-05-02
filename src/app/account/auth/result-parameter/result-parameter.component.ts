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
  echantillonId :Number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    // public dialog: MatDialog // Inject MatDialog service
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getParametersFromLocalStorage();
    });
  }
  private getParametersFromLocalStorage() {
    const storedParameters = localStorage.getItem('ListParamater');
    if (storedParameters) {
      this.parameters = JSON.parse(storedParameters);
    } else {
      console.error('No parameters found in localStorage');
      // Handle the absence of data as needed
    }
  }
  deleteParameter(index: number): void {
    this.parameters.splice(index, 1);
  }

  submitRequest(): void {
      localStorage.setItem('ListParamater', JSON.stringify(this.parameters));
      this.router.navigate(['/account/ResultDemande'], );
  }
}
