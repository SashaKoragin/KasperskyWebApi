import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPermissionsModule } from "ngx-permissions";
import { AngularMaterialModule } from "../MaterialModule/MaterialModule";
import { ChildNgRoutingAutoModule } from './ChildNgRoutingModule';
import { MainChildKasperskyTs } from '../../ChildAppKaspersky/MainChildKaspersky/MainChildKasperskyTs/MainChildKasperskyTs';
import { ViewGenerator } from '../../ChildAppKaspersky/ViewGenerator/ViewGeneratorTs/ViewGeneratorTs';
import { ModelValidator } from '../../Api/ValidationModel/ValidationModelTs/ValidationModel';
import { AllHostKaspersky } from '../../ChildAppKaspersky/HostModel/HostModelTs/HostModelTs';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ChildNgRoutingAutoModule,
    AngularMaterialModule,
    NgxPermissionsModule,
    ReactiveFormsModule
  ],
  declarations: [MainChildKasperskyTs, ViewGenerator, ModelValidator, AllHostKaspersky]
})

export class ChildNgAutoModule { }
