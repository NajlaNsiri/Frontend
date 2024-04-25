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

@NgModule({
  declarations: [
    // Declare all AuthModule-specific components here
    LoginComponent,
    SignupComponent,
    DemandeFormComponent,
    EchantillonFormComponent,
    ParameterListComponent,
    ParameterFormComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule // Import SharedModule to use components like ClientNavBarComponent
  ]
})
export class AuthModule { }
