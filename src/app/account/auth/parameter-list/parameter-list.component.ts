import { Component, OnInit } from '@angular/core';
import { ParameterService } from '../parameter.service';
import { Parameter } from 'src/app/core/models/parameter.model';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {
  parameters: Parameter[];

  constructor(private parameterService: ParameterService) { }

  ngOnInit() {
    this.getParameters();
  }

  getParameters(): void {
    this.parameterService.getParameters()
      .subscribe(parameters => this.parameters = parameters);
  }

  delete(parameterId:number,parameter: Parameter): void {
    this.parameterService.deleteParameter(parameterId)
      .subscribe(() => this.getParameters());
  }
  addParameter(parameter: Parameter):void{
    this.parameterService.createParameter(parameter)
    .subscribe(()=>this.getParameters());
  }
}
