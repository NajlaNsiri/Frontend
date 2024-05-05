import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Echantillon } from 'src/app/core/models/echantillon.model';
import { EchantillonService } from '../echantillon.service';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-list-echantillons',
  templateUrl: './list-echantillons.component.html',
  styleUrls: ['./list-echantillons.component.scss']
})
export class ListEchantillonsComponent implements OnInit {
  echantillons: Echantillon[] = [];
  demandeId: number = 0;
  selectedStatut: string = "";  // To hold the status selected from the dropdown
  etat: string="";
  constructor(
    private route: ActivatedRoute,
    private echantillonService: EchantillonService,
    private demandeService: DemandeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.demandeId = params['demandeId'];
      this.etat = params['etat'];
    });
    this.echantillonService.getEchantillonsByDemandeId(this.demandeId).subscribe({
      next: (echantillons) => {
        this.echantillons = echantillons;
      },
      error: (error) => {
        console.error('Failed to load echantillons:', error);
      }
    });    
  }
}
