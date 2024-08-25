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

  constructor(public authService:AuthService, public orderService:OrdersService, public productService:ProductsService){}

  @Input() product!:Product;
  @Output() newDeleteEvent:EventEmitter<Product> = new EventEmitter<Product>();

  // @Output() updateProduct = new EventEmitter<Product>();

  orders:Order[] = [];

  isRestrictedEditModeActiveUnits:boolean = true;
  isRestrictedEditModeActivePackage:boolean = true;
  isFullEditModeActive:boolean = false;
  isProductAlreadyOrdered!:boolean;
  ordersNumber:number = 0;
  
  previousUnitTypeQuantity: number = 0; // *** INIZIALIZZAZIONE DELLA QUANTITÀ PRECEDENTE DELLE UNITÀ ***
  previousPackagingTypeQuantity: number = 0; // *** INIZIALIZZAZIONE DELLA QUANTITÀ PRECEDENTE DELLE CONFEZIONI ***


  ngOnInit(): void {
    this.orderService.getAll().subscribe(data => {
      this.orders = data.filter(o => o.productName === this.product.productName && o.arrived === false)
      // this.isProductOrderedLogic();
      // console.log(this.orders);

      this.ordersNumber = this.orders.length;
    })

    if(this.product)
    {
      this.previousUnitTypeQuantity = this.product.unitTypeQuantity;
      this.previousPackagingTypeQuantity = this.product.packagingTypeQuantity;
    }
  }


   /**
 * Checks if the given value is a positive integer.
 * @param value - The value to check.
 * @returns `true` if the value is a positive integer, `false` otherwise.
 */
   isPositiveInteger(value: number): boolean 
   {
     return Number.isInteger(value) && value >= 0;
   }

   editUnitTypeQuantity() {
    console.log("Modifica quantità unità attivata");
    console.log("Quantità attuale delle unità:", this.product.unitTypeQuantity);
    console.log("Quantità precedente delle unità:", this.previousUnitTypeQuantity);

    if (
      this.product.unitTypeQuantity !== this.previousUnitTypeQuantity &&
      this.isPositiveInteger(this.product.id) &&
      this.isPositiveInteger(this.product.unitTypeQuantity)
    ) {
      console.log("Invio richiesta per aggiornare la quantità delle unità...");
      this.productService.updateRemainingUnitsQuantity(this.product.id, this.product.unitTypeQuantity).subscribe({
        next: data => {
          console.log("Quantità delle unità aggiornata con successo:", data);
          this.previousUnitTypeQuantity = this.product.unitTypeQuantity;
        },
        error: badResponse => {
          console.log("Errore nell'aggiornamento della quantità delle unità:", badResponse);
        }
      });
    } else {
      console.log("Nessun cambiamento nella quantità delle unità o valore non valido, richiesta non inviata.");
      this.product.unitTypeQuantity = this.previousUnitTypeQuantity;
    }
  }

  editPackagingTypeQuantity() {
    console.log("Modifica quantità confezioni attivata");
    console.log("Quantità attuale delle confezioni:", this.product.packagingTypeQuantity);
    console.log("Quantità precedente delle confezioni:", this.previousPackagingTypeQuantity);

    if (
      this.product.packagingTypeQuantity !== this.previousPackagingTypeQuantity &&
      this.isPositiveInteger(this.product.id) &&
      this.isPositiveInteger(this.product.packagingTypeQuantity)
    ) {
      console.log("Invio richiesta per aggiornare la quantità delle confezioni...");
      this.productService.updateRemainingPackagesQuantity(this.product.id, this.product.packagingTypeQuantity).subscribe({
        next: data => {
          console.log("Quantità delle confezioni aggiornata con successo:", data);
          this.previousPackagingTypeQuantity = this.product.packagingTypeQuantity;
        },
        error: badResponse => {
          console.log("Errore nell'aggiornamento della quantità delle confezioni:", badResponse);
        }
      });
    } else {
      console.log("Nessun cambiamento nella quantità delle confezioni o valore non valido, richiesta non inviata.");
      this.product.packagingTypeQuantity = this.previousPackagingTypeQuantity;
    }
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

  isProductPopoverVisible:boolean = false;

  toggleProductPopover()
  {
    this.isProductPopoverVisible = !this.isProductPopoverVisible;
    
  }

  deleteProduct()
  {
    this.isProductPopoverVisible = false;
    this.productService.delete(this.product.id).subscribe({

      next: data => {
        this.newDeleteEvent.emit(data)
        console.log("Prodotto eliminato con successo:", data);
      },
      error:badResponse => {
        console.log("Errore nell'eliminazione del prodotto:", badResponse);


      }
    });
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
