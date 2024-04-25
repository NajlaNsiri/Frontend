import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-demande',
  templateUrl: './result-demande.component.html',
  styleUrls: ['./result-demande.component.scss']
})
export class ResultDemandeComponent implements OnInit {
  parameters: any[];
  echantillonId :Number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.echantillonId = +params['echantillonId'];
      this.parameters = JSON.parse(params['parameters']);
    });
  }
  
  saveParameters(): void {
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
