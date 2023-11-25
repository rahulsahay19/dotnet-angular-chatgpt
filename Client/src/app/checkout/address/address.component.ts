import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from 'src/app/shared/models/address';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup; // Initialize here

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private checkoutComponent: CheckoutComponent
     ) {
    this.addressForm = this.formBuilder.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Street: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],

    });
  }

  ngOnInit(): void {
    // You can keep this method empty if there's no additional initialization needed
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData: Address = this.addressForm.value;
      // Do something with the submitted address data, e.g., send it to an API
      console.log('Submitted Address:', addressData);
    }
  }
  goToNextStep() {
    if (this.addressForm.valid) {
      // Navigate to the shipment route
      this.router.navigate(['/checkout/shipment']);
  
      // Set the current step in the CheckoutComponent
      this.checkoutComponent.setCurrentStep('shipment');
    }
  }
  
  }

