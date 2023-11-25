import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    AddressComponent,
    ShipmentComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
  ]
})
export class CheckoutModule { }
