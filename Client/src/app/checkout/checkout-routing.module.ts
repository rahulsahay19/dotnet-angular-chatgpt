import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { canActivate } from '../core/guards/auth.guard';
import { AddressComponent } from './address/address.component';
import { ReviewComponent } from './review/review.component';
import { ShipmentComponent } from './shipment/shipment.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [canActivate],
    children: [
      { path: 'address', component: AddressComponent }, // Address step
      { path: 'shipment', component: ShipmentComponent }, // Shipment step
      { path: 'review', component: ReviewComponent }, // Review step
      // Add more steps as needed
      { path: '', redirectTo: 'address', pathMatch: 'full' } // Default to the 'address' step
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}
