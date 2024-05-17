import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EchantillonService } from '../echantillon.service';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { Parameter } from 'src/app/core/models/parameter.model';

@Component({
  selector: 'app-list-echantillons',
  templateUrl: './list-echantillons.component.html',
  styleUrls: ['./list-echantillons.component.scss']
})
export class ListEchantillonsComponent implements OnInit {
  echantillons: Echantillon[] = [];
  demandeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private echantillonService: EchantillonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.demandeId = params['demandeId'];
      this.echantillonService.getEchantillonsByDemandeId(this.demandeId).subscribe({
        next: (echantillons) => {
          this.echantillons = echantillons.map(e => ({ ...e, showDetails: false, parameters: [] }));
        },
        error: (error) => {
          console.error('Failed to load echantillons:', error);
          this.router.navigate(['/account/login']);
        }
      });
    });
  }

  toggleDetail(echantillon: Echantillon): void {
    if (!echantillon.showDetails) {
      this.echantillonService.getParametersByEchantillonId(echantillon.echantillonId).subscribe({
        next: (parameters: Parameter[]) => {
          echantillon.parameters = parameters;
          echantillon.showDetails = true;
        },
        error: () => {
          echantillon.parameters = [];
          console.error('Failed to fetch parameters');
        }
      });
    } else {
      echantillon.showDetails = false;
    }
  }
  
}
