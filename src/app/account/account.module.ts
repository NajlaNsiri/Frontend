// account.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
    // Do not import AuthModule here because it's lazy-loaded
  ]
})
export class AccountModule { }
