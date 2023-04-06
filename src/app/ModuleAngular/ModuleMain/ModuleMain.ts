import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./ModuleMainRouting";
import { AuthModule } from '../ModuleLogin/ModuleLogin';
import { HttpClientModule } from "@angular/common/http";
import { NgxPermissionsModule } from "ngx-permissions";
import { AngularMaterialModule } from "../MaterialModule/MaterialModule";
import { MainAppKaspersky } from '../../GlobalMainApp/MainAppTs/MainAppTs';



@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AngularMaterialModule
  ],
  declarations: [
    MainAppKaspersky
  ],
  bootstrap: [MainAppKaspersky]
})

export class AppModule { }
