import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { DemandeFormComponent } from './auth/demande-form/demande-form.component';
import { EchantillonFormComponent } from './auth/echantillon-form/echantillon-form.component';
import { ParameterListComponent } from './auth/parameter-list/parameter-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParameterFormComponent } from './auth/paramater-form/paramater-form.component';

@NgModule({
  declarations: [
    DemandeFormComponent,
    EchantillonFormComponent,
    ParameterListComponent,
    ParameterFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
