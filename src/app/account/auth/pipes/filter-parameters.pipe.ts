import { Pipe, PipeTransform } from '@angular/core';
import { Parameter } from 'src/app/core/models/parameter.model';

@Pipe({
  name: 'filterParameters'
})
export class FilterParametersPipe implements PipeTransform {
  transform(parameters: Parameter[], echantillonId: number): Parameter[] {
    return parameters ? parameters.filter(param => param.echantillonId === echantillonId) : [];
  }
}
