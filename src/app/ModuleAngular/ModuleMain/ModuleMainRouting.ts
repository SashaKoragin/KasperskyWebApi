import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authorization } from '../Security/SecurityModel/SecurityModel';
import { ChildNgAutoModule } from '../ChildModule/ChildNgModule';



const appRoutes: Routes = [
  {
      path: 'KasperskyApi',
      loadChildren: ()=> ChildNgAutoModule,
      canLoad: [Authorization]
  }


];

@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes,
          {
              enableTracing: false // <-- debugging purposes only
          }
      )
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
