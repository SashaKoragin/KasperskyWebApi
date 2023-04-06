import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Login } from '../Security/SecurityTs/SecurityTs';
import { AngularMaterialModule } from '../MaterialModule/MaterialModule';
import { AuthRoutingModule } from './ModuleLoginRouting';



@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule,
  ],

})
export class AuthModule { }
