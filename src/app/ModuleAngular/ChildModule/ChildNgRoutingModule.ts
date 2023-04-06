import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authorization } from '../Security/SecurityModel/SecurityModel';
import { MainChildKasperskyTs } from '../../ChildAppKaspersky/MainChildKaspersky/MainChildKasperskyTs/MainChildKasperskyTs';
import { ViewGenerator } from '../../ChildAppKaspersky/ViewGenerator/ViewGeneratorTs/ViewGeneratorTs';
import { AllHostKaspersky } from '../../ChildAppKaspersky/HostModel/HostModelTs/HostModelTs';


const appRoutes: Routes = [
  {
    path: '',
    component: MainChildKasperskyTs,
    canActivate: [Authorization],
    children: [
      {

        path: 'AllHostKaspersky',
        component: AllHostKaspersky
      },
      {
        path: 'ViewGenerator',
        component: ViewGenerator
      },
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class ChildNgRoutingAutoModule { }
