import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryOption } from 'src/app/shared/models/deliveryOption';
import { CheckoutComponent } from '../checkout.component';


@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent {
  deliveryOptions: DeliveryOption[] = [
    { id: 1, name: 'Fedex', deliveryTime: '2 days', description: 'Fast delivery', price: 300 },
    { id: 2, name: 'DTDC', deliveryTime: '3 days', description: 'Reliable delivery', price: 200 },
    { id: 3, name: 'First Flight', deliveryTime: '4 days', description: 'Economical delivery', price: 150 },
    { id: 4, name: 'Normal', deliveryTime: '7 days', description: 'Standard delivery', price: 100 },
  ];

  selectedOption: number | undefined;
  shipmentForm: FormGroup;
  constructor(
            private basketService: BasketService, 
            private formBuilder: FormBuilder,
            private router: Router,
            private checkoutComponent: CheckoutComponent) {
    
    this.shipmentForm = this.formBuilder.group({
      selectedOption: [this.selectedOption, Validators.required],
    });
    // Initialize the selected option with the first option by default
    this.selectedOption = this.deliveryOptions[0].id;
    // Call the method to update the shipment price based on the default option
    this.updateShipmentPrice();
  }
  // Define a method to update the shipment price and total
  updateShipmentPrice() {
    const selectedDeliveryOption = this.deliveryOptions.find(
      (option) => option.id === this.selectedOption
    );

    if (selectedDeliveryOption) {
      this.basketService.updateShippingPrice(selectedDeliveryOption.price);
    }
  }
  

  // Define a method to navigate to the next step
  goToNext() {
      // Perform any necessary actions before navigating to the next step
      // For example, update the shipping price based on the selected option
      this.updateShipmentPrice();
      this.router.navigate(['/checkout/review']);
      // Set the current step in the CheckoutComponent
      this.checkoutComponent.setCurrentStep('review');
    
  }
}
