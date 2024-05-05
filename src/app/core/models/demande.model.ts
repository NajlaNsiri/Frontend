import { Langue } from "./langue.enum";

// models/demande.model.ts
export class Demande {
  demandeId: number;
  demandePour: string;
  envoyeAuLaboratoire: string;
  courrielsSupplementaires: string;
  bonDeCommande: string;
  unEchantillon: boolean;
  etat: string; // Assuming etat is a nested object based on your example
  langueDuCertificat: string;
  commentairesInternes: string;
    constructor(
      demandeId: number,
      demandePour: string,
      envoyeAuLaboratoire: string,
      courrielsSupplementaires: string,
      bonDeCommande: string,
      unEchantillon: boolean,
      etat: string, // Assuming etat is a nested object based on your example
      langueDuCertificat: string,
      commentairesInternes: string,
    ) {
      this.demandePour = demandePour;
      this.envoyeAuLaboratoire = envoyeAuLaboratoire;
      this.courrielsSupplementaires = courrielsSupplementaires;
      this.bonDeCommande = bonDeCommande;
      this.unEchantillon = unEchantillon;
      this.langueDuCertificat = langueDuCertificat;
      this.commentairesInternes = commentairesInternes;
      this.etat= etat;
    }
  }
  