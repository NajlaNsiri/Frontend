import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/core/models/demande.model';
import { DemandeService } from '../demande.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {
  demandes: Demande[] = [];
  // demandes = [
  //   {
  //     DemandeID: 1,
  //     DemandePour: 'Client A',
  //     EnvoyeAuLaboratoire: 'Lab X',
  //     CourrielsSupplementaires: 'clienta@example.com',
  //     BonDeCommande: '1234',
  //     UnEchantillon: true,
  //     LangueDuCertificat: 'francais',
  //     CommentairesInternes: 'Initial review completed'
  //   },
  //   // More fake demandes can be added here
  // ];
  constructor(private demandeService: DemandeService,private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes();
  }
  loadDemandes(): void {
    const demandeIds = [1, 2, 3, 4]; // Example IDs of demandes to fetch

    forkJoin(demandeIds.map(id => this.demandeService.getDemande(id)))
      .subscribe(results => {
        this.demandes = results;
      }, error => {
        console.error('Failed to load demandes:', error);
      });
  }
  details(demandeId:number){
    this.router.navigate(['/echantillonList'], { queryParams: { demandeId: demandeId } });
  }
  acceptDemande(id: number) {
    console.log('Demande accepted with ID:', id);
    // Here you would handle the acceptance of the demande
  }

  refuseDemande(id: number) {
    console.log('Demande refused with ID:', id);
    // Here you would handle the refusal of the demande
  }

  // Implement any additional methods you need, such as for calculations

}
