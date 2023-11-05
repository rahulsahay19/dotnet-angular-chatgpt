import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ConnectionRefusedComponent } from './connection-refused/connection-refused.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    NavBarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ConnectionRefusedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports:[
    NavBarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ConnectionRefusedComponent
  ]
})
export class CoreModule { }
