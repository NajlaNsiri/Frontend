import { Langue } from "./langue.enum";

// models/demande.model.ts
export class Demande {
    demandeId?: number;
    demandePour: string;
    envoyeAuLaboratoire: string;
    courrielsSupplementaires: string;
    bonDeCommande: string;
    unEchantillon: boolean;
    langueDuCertificat: Langue;
    commentairesInternes: string;
    userId: number;
    constructor(
      demandePour: string,
      envoyeAuLaboratoire: string,
      courrielsSupplementaires: string,
      bonDeCommande: string,
      unEchantillon: boolean,
      langueDuCertificat: Langue,
      commentairesInternes: string,
      userId: number,
      demandeId?: number
    ) {
      this.demandeId = demandeId;
      this.demandePour = demandePour;
      this.envoyeAuLaboratoire = envoyeAuLaboratoire;
      this.courrielsSupplementaires = courrielsSupplementaires;
      this.bonDeCommande = bonDeCommande;
      this.unEchantillon = unEchantillon;
      this.langueDuCertificat = langueDuCertificat;
      this.commentairesInternes = commentairesInternes;
      this.userId = userId;
    }
  }
  