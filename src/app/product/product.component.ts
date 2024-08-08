import { Component, HostListener, Input, OnInit } from '@angular/core';
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
import { Order } from '../model/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-product]',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit
{

  constructor(public authService:AuthService, public orderService:OrdersService){}

  @Input() product!:Product;

  orders:Order[] = [];

  isRestrictedEditModeActiveUnits:boolean = true;
  isRestrictedEditModeActivePackage:boolean = true;
  isFullEditModeActive:boolean = false;
  isProductAlreadyOrdered!:boolean;

  isProductOrderedLogic():void {
    
    if(this.orders.length>0)
      this.isProductAlreadyOrdered = true;
    else
      this.isProductAlreadyOrdered = false;

    console.log(this.product.productName);
    console.log('orders:', this.orders);
    console.log('isProductAlreadyOrdered:', this.isProductAlreadyOrdered);

  }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(data => {
      this.orders = data.filter(o => o.productName === this.product.productName && o.arrived === false)
      this.isProductOrderedLogic();
      console.log(this.orders);
    })

  }


  orderForm:FormGroup = new FormGroup
  ({
    unitOrderedQuantity: new FormControl('', Validators.required), // ! Da cambiare con il vero validatore
    packagingOrderedQuantity: new FormControl(''),
  });




  stockQuantity():number
  {
    return this.product.unitTypeQuantity+(this.product.unitsPerPackaging*this.product.packagingTypeQuantity)
  }

  /**
   * !Bisogna aggiungere nuova proprietà alla modellizzazione altrimenti non può essere davvero utile
   * * ^ fatto
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
  }

  // Close the popover when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const popoverElement = document.querySelector('.popoverConfirm'); // Make sure this matches the popover class

    // Check if the click target is outside the popover and the button
    if (popoverElement && !popoverElement.contains(buttonElement) && !buttonElement.closest('button')) {
      this.isPopoverVisible = false; // Close the popover
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

      /**
       * * Il reload serve per mostrare in tempo reale la modifica in tempo reale della spunta che
       * * mostra il prodotto come già ordinato
       * ! Essendo un reload intero di pagina non è il top a livello di prestazioni quindi più avanti magari
       * ! Possiamo capire se con un BehaviourSubject o un EventEmitter è possibile ottenere un risultato più leggero.
       * @Santo
       */
      window.location.reload(); 
    },
    error: badResponse => {
      console.log("Error AAAAAAAAAAAAAAAAAAAA:", badResponse);
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
