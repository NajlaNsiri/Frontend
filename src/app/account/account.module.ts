import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { DemandeFormComponent } from './demande-form/demande-form.component';

@NgModule({
  declarations: [
    DemandeFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule
  ]
})
export class AccountModule { }
