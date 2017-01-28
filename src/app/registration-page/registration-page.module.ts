import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BioApiModule } from '../api/api.module';
import { BioAuthModule } from '../auth/auth.module';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { RegistrationPageComponent } from './registration-page.component';

@NgModule({
  imports: [
    BioApiModule,
    BioAuthModule,
    CommonModule,
    ReactiveFormsModule,
    RegistrationPageRoutingModule
  ],
  declarations: [
    RegistrationPageComponent
  ]
})
export class RegistrationPageModule { }