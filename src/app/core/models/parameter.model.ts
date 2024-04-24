// models/parameter.model.ts
import { Echantillon } from './echantillon.model';

export class Parameter {
  name: string;
  rdl: number; 
  unit: string;
  echantillonId: number; 
  echantillon?: Echantillon;
  constructor(
    name: string,
    rdl: number,
    unit: string,
    echantillonId: number,
  ) {
    this.name = name;
    this.rdl = rdl;
    this.unit = unit;
    this.echantillonId = echantillonId;
  }
}
