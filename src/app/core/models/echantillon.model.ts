import { Gabarit } from "./gabarit.enum";
import { Priorite } from "./priorite.enum";
import { TypeEchantillon } from "./typeEchantillon.enum";
import { Demande } from './demande.model';

export class Echantillon {
  echantillonId: number;
  gabarit: string; 
  typeEchantillon: string;
  nomEchantillon: string;
  lieuPrelevement: string;
  addressRetourner: string; 
  dateFinPrelevement: string; 
  heureFinPrelevement: string; 
  priorite: string; 
  commentairesInternes: string;
  demandeId: number;
  parameterIds?: number[]; 
  disposes: string; 
  returns: string; 

  constructor(
      gabarit: string,
      typeEchantillon: string,
      nomEchantillon: string,
      lieuPrelevement: string,
      addressRetourner: string,
      dateFinPrelevement: string,
      heureFinPrelevement: string,
      priorite: string,
      commentairesInternes: string,
      demandeId: number,
      disposes: string,
      returns: string,
      parameterIds?: number[]
  ) {
      this.gabarit = gabarit;
      this.typeEchantillon = typeEchantillon;
      this.nomEchantillon = nomEchantillon;
      this.lieuPrelevement = lieuPrelevement;
      this.addressRetourner = addressRetourner;
      this.dateFinPrelevement = dateFinPrelevement;
      this.heureFinPrelevement = heureFinPrelevement;
      this.priorite = priorite;
      this.commentairesInternes = commentairesInternes;
      this.demandeId = demandeId;
      this.disposes = disposes;
      this.returns = returns;
      this.parameterIds = parameterIds;
  }
}
