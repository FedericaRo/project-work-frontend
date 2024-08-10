import { Component, HostListener, Input } from '@angular/core';
import { Product } from '../model/Product';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrdersService } from '../services/orders.service';
import { integerValidator } from '../validators/integerCheck';

@Component({
  selector: 'tr[app-product]',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent 
{

  constructor(public authService:AuthService, public orderService:OrdersService){}

  @Input() product!:Product;

  isRestrictedEditModeActiveUnits:boolean = true;
  isRestrictedEditModeActivePackage:boolean = true;
  isFullEditModeActive:boolean = false;

  orderForm:FormGroup = new FormGroup
  ({
    unitOrderedQuantity: new FormControl('', [Validators.required, Validators.min(0), integerValidator]), // ! Aggiugnere validatore per mettere almeno una quantità
    packagingOrderedQuantity: new FormControl('', [Validators.required, Validators.min(0), integerValidator])
  });


  stockQuantity():number
  {
    return this.product.unitTypeQuantity+(this.product.unitsPerPackaging*this.product.packagingTypeQuantity)
  }

  /**
   * !Bisogna aggiungere nuova proprietà alla modellizzazione altrimenti non può essere davvero utile
   * @Santo
   */
  refillLevel():number
  {
    if(this.stockQuantity()<=this.product.reorderPoint) // Quando sarebbe meglio riordinare che son poche
      return 1;

    if(this.stockQuantity()>this.product.reorderPoint && this.stockQuantity()<this.product.reorderPoint*2) // quando sono abbastanza ma non così tante
      return 2;

    return 3 // quando si sta una favola
  }

  employeeEditProductUnitsToggle()
  {
    this.isRestrictedEditModeActiveUnits = !this.isRestrictedEditModeActiveUnits ;
  }
  
  employeeEditProductPackageToggle()
  {
    this.isRestrictedEditModeActivePackage = !this.isRestrictedEditModeActivePackage;
  }

  isPopoverVisible: boolean = false; // Property to manage popover visibility

  // Toggle the visibility of the popover
  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
    if (!this.isPopoverVisible)
      this.orderForm.reset();
  }

  // Close the popover when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const popoverElement = document.querySelector('.popoverConfirm'); // Make sure this matches the popover class

    // Check if the click target is outside the popover and the button
    if (popoverElement && !popoverElement.contains(buttonElement) && !buttonElement.closest('button')) {
      this.isPopoverVisible = false; // Close the popover
      this.orderForm.reset();
    }
  }

  sendOrder()
  {
    this.isPopoverVisible = false;
    console.log("SEND ORDER MOCK")
    this.orderService.addOrder(this.product.id!, this.orderForm.value)
    .subscribe(
    {

    next: data => {
      console.log(data);
      this.orderForm.reset();
    },
    error: badResponse => {
      console.log("Error AAAAAAAAAAAAAAAAAAAA:", badResponse);
      this.orderForm.reset();

    }})

  }

  
  // employeeEditProductUnitsToggle()
  // {
  //   this.isRestrictedEditModeActiveUnits = false;
  // }
  // employeeEditProductUnitsToggleDone()
  // {
  //   this.isRestrictedEditModeActiveUnits = true;
  // }
  // employeeEditProductPackageToggle()
  // {
  //   this.isRestrictedEditModeActivePackage = false;
  // }

  // employeeEditProductPackageToggleDone()
  // {
  //   this.isRestrictedEditModeActivePackage = true;
  // }

}
