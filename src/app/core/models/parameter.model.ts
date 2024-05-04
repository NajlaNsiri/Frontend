// models/parameter.model.ts
import { Echantillon } from './echantillon.model';

export class Parameter {
  parameterId : number;
  name: string;
  rdl: number;
  unit: string;
  echantillonId: number;
  echantillon?: Echantillon;

  constructor(parameterId:number ,name: string, rdl: number, unit: string, echantillonId: number) {
    this.parameterId = parameterId;
    this.name = name;
    this.rdl = rdl;
    this.unit = unit;
    this.echantillonId = echantillonId;
  }
}
