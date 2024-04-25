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
      this.echantillonId= +params['echantillonId'];
      this.parameters = JSON.parse(params['parameters']);
    });
  }

  deleteParameter(index: number): void {
    this.parameters.splice(index, 1);
  }

  submitRequest(): void {
      const url = `http://localhost:4000/api/parameters/${this.echantillonId}`; 
      this.http.post(url, this.parameters).subscribe({
        next: (response) => {
          console.log('Parameters saved successfully', response);
          // Handle success response
        },
        error: (error) => {
          console.error('Error saving parameters', error);
          // Handle error response
        }
      });
  }
}
