import { Component, EventEmitter, HostListener, Input, OnInit, Output, output } from '@angular/core';
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
import { Order } from '../model/Order';
import { Router } from '@angular/router';
import { atLeastOnePositiveNumber } from '../validators/atLeastOnePositiveNumber';

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

  // @Output() updateProduct = new EventEmitter<Product>();
  @Output() newOrder = new EventEmitter<String>();

  orders:Order[] = [];

  isRestrictedEditModeActiveUnits:boolean = true;
  isRestrictedEditModeActivePackage:boolean = true;
  isFullEditModeActive:boolean = false;
  isProductAlreadyOrdered!:boolean;
  ordersNumber:number = 0;


  ngOnInit(): void {
    this.orderService.getAll().subscribe(data => {
      this.orders = data.filter(o => o.productName === this.product.productName && o.arrived === false)
      // this.isProductOrderedLogic();
      // console.log(this.orders);

      this.ordersNumber = this.orders.length;
    })

  }


  orderForm:FormGroup = new FormGroup
  ({
    unitOrderedQuantity: new FormControl('', [ Validators.min(0), integerValidator]), // ! Aggiugnere validatore per mettere almeno una quantità
    packagingOrderedQuantity: new FormControl('', [ Validators.min(0), integerValidator]),
    }, {validators: atLeastOnePositiveNumber()}
    
  );




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
      this.orders.push(data);
      this.newOrder.emit("Success")
    },
    error: badResponse => {
      console.log("Error AAAAAAAAAAAAAAAAAAAA:", badResponse);
      this.orderForm.reset();


      // this.updateProduct.emit(this.product);
      /**
       * * Il reload serve per mostrare in tempo reale la modifica della spunta che
       * * mostra il prodotto come già ordinato
       * ! Essendo un reload intero di pagina non è il top a livello di prestazioni quindi più avanti magari
       * ! Possiamo capire se con un BehaviourSubject o un EventEmitter è possibile ottenere un risultato più leggero.
       * @Santo
       */
      // window.location.reload(); 

    }})
  }

  deleteLatestOrderDone()
  {
    this.orderService.deleteLastOrder(this.product.productName)
    .subscribe(
      {
        next: data => {
          console.log(data);
          this.orders.splice(this.orders.length-1,1)
          // window.location.reload();
        },
        error: err => {
          console.log("woops", err);
        }
      }
    )
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
