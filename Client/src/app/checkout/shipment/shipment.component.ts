import { Component } from '@angular/core';
import { DeliveryOption } from 'src/app/shared/models/deliveryOption';


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

  constructor() {
    // Initialize the selected option with the first option by default
    this.selectedOption = this.deliveryOptions[0].id;
  }
}
