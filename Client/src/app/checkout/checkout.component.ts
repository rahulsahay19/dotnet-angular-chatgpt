import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  currentStep: 'address' | 'shipment' | 'review' = 'address';

  setCurrentStep(step: 'address' | 'shipment' | 'review') {
    this.currentStep = step;
  }
}
