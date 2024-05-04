// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing';

// Import all components specific to AuthModule
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { EchantillonFormComponent } from './echantillon-form/echantillon-form.component';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { ParameterFormComponent } from './paramater-form/paramater-form.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ResultParameterComponent } from './result-parameter/result-parameter.component';
import { ResultDemandeComponent } from './result-demande/result-demande.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ListEchantillonComponent } from './list-echantillon/list-echantillon.component';
import { UpdateEchanttillonComponent } from './update-echanttillon/update-echanttillon.component';
import { UpdateListParameterComponent } from './update-list-parameter/update-list-parameter.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DemandeFormComponent,
    EchantillonFormComponent,
    ParameterListComponent,
    ParameterFormComponent,
    UpdateProfileComponent,
    ResultParameterComponent,
    ResultDemandeComponent,
    RestPasswordComponent,
    UpdatePasswordComponent,
    ListEchantillonComponent,
    UpdateEchanttillonComponent,
    UpdateListParameterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule // Import SharedModule to use components like ClientNavBarComponent
  ]
})
export class AuthModule { }
