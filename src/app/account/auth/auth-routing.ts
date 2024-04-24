import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { EchantillonFormComponent } from './echantillon-form/echantillon-form.component';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { ParameterFormComponent } from './paramater-form/paramater-form.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'demande',
        component:DemandeFormComponent
    },
    {
        path: 'echantillon',
        component: EchantillonFormComponent
    },
    {
        path :'paramter',
        component:ParameterFormComponent
    }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
