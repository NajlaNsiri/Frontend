import { Gabarit } from "./gabarit.enum";
import { Priorite } from "./priorite.enum";
import { TypeEchantillon } from "./typeEchantillon.enum";
import { Demande } from './demande.model';

export class Echantillon {
    echantillonId?: number;
    gabarit: Gabarit;
    typeEchantillon: TypeEchantillon;
    normeEchantillon: string;
    nomEchantillon: string;
    lieuPrelevement: string;
    dateFinPrelevement: string;  // Date as ISO string
    heureFinPrelevement: string; // Time as ISO string
    priorite: Priorite;
    commentairesInternes: string;
    demandeId: number;  
    demande?: Demande;
    constructor(
      gabarit: Gabarit,
      typeEchantillon: TypeEchantillon,
      normeEchantillon: string,
      nomEchantillon: string,
      lieuPrelevement: string,
      dateFinPrelevement: string,
      heureFinPrelevement: string,
      priorite: Priorite,
      commentairesInternes: string,
      demandeId: number,
      echantillonId?: number
    ) {
      this.echantillonId = echantillonId;
      this.gabarit = gabarit;
      this.typeEchantillon = typeEchantillon;
      this.normeEchantillon = normeEchantillon;
      this.nomEchantillon = nomEchantillon;
      this.lieuPrelevement = lieuPrelevement;
      this.dateFinPrelevement = dateFinPrelevement;
      this.heureFinPrelevement = heureFinPrelevement;
      this.priorite = priorite;
      this.commentairesInternes = commentairesInternes;
      this.demandeId = demandeId;
    }
  }