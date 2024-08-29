import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/Product';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewProductStepperComponent } from "../new-product-stepper/new-product-stepper.component";
import { MatIconModule } from '@angular/material/icon';
import { NewCategoryFormComponent } from "../new-category-form/new-category-form.component";
import { NewSupplierFormComponent } from "../new-supplier-form/new-supplier-form.component";
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import { RouterLink } from '@angular/router';
import { ProductsiblingsService } from '../services/productsiblings.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, FormsModule, MatTooltipModule, NewProductStepperComponent, MatIconModule, NewCategoryFormComponent, NewSupplierFormComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  constructor(private productService: ProductsService, private sanitizer: DomSanitizer, siblingService:ProductsiblingsService) {}
  
  openCreateProductStepper: boolean = false;
  openCreateCategory: boolean = false;
  openCreateSupplier: boolean = false;
  
  isDialOpen: boolean = false;
  categoryCounter: number = 0;
  supplierCounter: number = 0;
  codeCounter: number = 0;
  quantityRemainingCounter: number = 0;
  genericError: string = ''
  
  products: Product[] = []; 
  productsBackup: Product[] = [];
  orders: Order[] = [];
  
  filterCriteria: string = '';

  isToastVisible: boolean = false;
  
  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data.reverse();
      console.log(this.products);
    });

    this.productService.getAll().subscribe(data => {
      this.productsBackup = data.reverse();
    });
  }

  toggleDial(): void {
    this.isDialOpen = !this.isDialOpen;
  }

  toggleDialDaFiglio(value: boolean): void {
    this.openCreateProductStepper = value;
  }

  toggleCategoryDialDaFiglio(value: boolean): void {
    this.openCreateCategory = value;
  }

  toggleSupplierDialDaFiglio(value: boolean): void {
    this.openCreateSupplier = value;
  }

  toggleStepperCreate(): void {
    this.openCreateProductStepper = !this.openCreateProductStepper;
  }

  toggleCategoryCreate(): void {
    this.openCreateCategory = !this.openCreateCategory;
  }

  toggleSupplierCreate(): void {
    this.openCreateSupplier = !this.openCreateSupplier;
  }

  sortByCategory(): void {
    this.categoryCounter++;
    let valore = this.categoryCounter % 3;

    if (valore == 0) {
      this.products = this.productsBackup;
    }
    if (valore == 1) {
      this.products = [...this.productsBackup].sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    }
    if (valore == 2) {
      this.products = [...this.productsBackup].sort((a, b) => b.categoryName.localeCompare(a.categoryName));
    }
  }

  sortBySupplier(): void {
    this.supplierCounter++;
    let valore = this.supplierCounter % 3;

    if (valore == 0) {
      this.products = this.productsBackup;
    }
    if (valore == 1) {
      this.products = [...this.productsBackup].sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    }
    if (valore == 2) {
      this.products = [...this.productsBackup].sort((a, b) => b.supplierName.localeCompare(a.supplierName));
    }
  }

  sortByCode(): void {
    this.codeCounter++;
    let valore = this.codeCounter % 3;

    if (valore == 0) {
      this.products = this.productsBackup;
    }
    if (valore == 1) {
      this.products = [...this.productsBackup].sort((a, b) => a.code.localeCompare(b.code));
    }
    if (valore == 2) {
      this.products = [...this.productsBackup].sort((a, b) => b.code.localeCompare(a.code));
    }
  }

  sortQuantityRemaining(): void {
    this.quantityRemainingCounter++;
    let valore = this.quantityRemainingCounter % 3;

    if (valore == 0) {
      this.products = this.productsBackup;
    }
    if (valore == 1) {
      this.products = [...this.productsBackup].sort((a, b) => (a.unitTypeQuantity + (a.unitsPerPackaging * a.packagingTypeQuantity)) - (b.unitTypeQuantity + (b.unitsPerPackaging * b.packagingTypeQuantity)));
    }
    if (valore == 2) {
      this.products = [...this.productsBackup].sort((a, b) => (b.unitTypeQuantity + (b.unitsPerPackaging * b.packagingTypeQuantity)) - (a.unitTypeQuantity + (a.unitsPerPackaging * a.packagingTypeQuantity)));
    }
  }

  filterByEverything(): void {
    this.products = this.productsBackup;

    for (let product of this.products) {
      if (product.code.toLowerCase().includes(this.filterCriteria.toLowerCase()))
        this.products = this.products.filter(p => p.code.toLowerCase().includes(this.filterCriteria.toLowerCase()));
      else if (product.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
        this.products = this.products.filter(p => p.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
      else if (product.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
        this.products = this.products.filter(p => p.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
      else if (product.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
        this.products = this.products.filter(p => p.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    }
  }

  flashId: number | null = null;
  
  saveNewProduct(product: Product): void {
    this.productService.newProduct(product)
      .subscribe({
        next: data => {
          console.log(data);
          this.products.unshift(data);
          this.flashId = data.id;
          this.toggleStepperCreate();

          setTimeout(() => {
            this.flashId = null;
          }, 500);
        },
        error: badResponse => {
          console.error("Errore nell'aggiunta di un nuovo prodotto", badResponse);
        },
      });
  }

  showToastDiv = false; // Initially hidden
  isVisible = false;

  showToast() {
    this.showToastDiv = true; // Ensure the toast div is in the DOM
    setTimeout(() => {
      this.isVisible = true; // Trigger the fade-in effect

      // Automatically hide the toast after 3 seconds
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    }, 100); // Slight delay to allow for DOM rendering
  }

  hideToast() {
    this.isVisible = false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showToastDiv = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  deleteProduct(productId:number)
  {
    let index = this.products.findIndex((p: Product) => p.id === productId);
    if(index !== -1)
    {
      this.products.splice(index, 1);
    }
  }

  deleteLastOrder(errore:string)
  {
    if(errore){
      this.genericError = errore; 
      this.animateError();
    }
  }

  animateError() {
    const alertElement = document.getElementById('alert');
    if (alertElement) {
      alertElement.classList.add('show');
      setTimeout(() => {
        alertElement.classList.add('hide');
        setTimeout(() => {
          alertElement.classList.remove('show', 'hide');
        }, 500); // Durata dell'animazione di uscita
      }, 5000); // Durata della visualizzazione
    }
  }




}
    //   onOrdersUpdate(product: Product): void {
    //     let index = this.products.indexOf(product);
    
    //     // Verifica che l'elemento sia stato trovato
    //     if (index !== -1) {
    //         // Rimuovi l'elemento
    //         let element = this.products.splice(index, 1)[0];
    
    //         // Reinserisci l'elemento nella stessa posizione
    //         this.products.splice(index, 0, element);
    //     }
    // }
  
    /**
     * ?prima versione del filtro solo per categoria
     */
    // filteredByCategory():void
    // {
    //   this.products = this.productsBackup;
    //   this.products = this.products.filter(p => p.categoryName.includes(this.filterCriteria));
    // }
  /**
   * ?test che avevo fatto che non funzionava, sopra 
   * ?c'è la versione funzionante (in teoria ahah)
   */
  // if(this.products.filter(p=>p.supplierCode.includes(this.filterCriteria)))
  // {
  //   this.products = this.products.filter(p => p.supplierCode.includes(this.filterCriteria));
  // }
  // else if(this.products.filter(p=>p.categoryName.includes(this.filterCriteria)))
  // {
  //   this.products = this.products.filter(p => p.categoryName.includes(this.filterCriteria));
  // }



