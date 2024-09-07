import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/Product';
import { DomSanitizer} from '@angular/platform-browser';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewProductStepperComponent } from "../new-product-stepper/new-product-stepper.component";
import { MatIconModule } from '@angular/material/icon';
import { NewCategoryFormComponent } from "../new-category-form/new-category-form.component";
import { NewSupplierFormComponent } from "../new-supplier-form/new-supplier-form.component";
import { Order } from '../model/Order';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { ProductsiblingsService } from '../services/productsiblings.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, FormsModule, MatTooltipModule, NewProductStepperComponent, MatIconModule, NewCategoryFormComponent, NewSupplierFormComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  constructor(private productService: ProductsService, private sanitizer: DomSanitizer, siblingService:ProductsiblingsService, public authService: AuthService) {}

  
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

  filter(): void 
  {
    if (this.filterCriteria) 
    {
      const criteria = this.filterCriteria.toLowerCase();
      this.products = this.productsBackup.filter(product =>
        this.matchesCriteria(product, criteria)
      );
    } 
    else 
    {
      this.products = [...this.products];
    }

    console.log('Orders after filtering:', this.products);
  }

private matchesCriteria(product: Product, criteria: string): boolean {

  const values = [...Object.values(product).filter(v => v != null)];
  console.log('Values to match:', values);
  console.log('Criteria:', criteria);

  return values.some(value =>
    value.toString().toLowerCase().includes(criteria)
  );
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
          this.showToast("Nuovo prodotto aggiunto con successo")
          setTimeout(() => {
            this.flashId = null;
          }, 500);
        },
        error: badResponse => {
          console.error("Errore nell'aggiunta di un nuovo prodotto", badResponse);
          this.genericError = badResponse.error; 
          this.animateError()
        },
      });
  }

  showToastDiv = false;
  isVisible = false;
  toastMessage = "";

  showToast(toastMessage: string) {
    this.toastMessage = toastMessage;
    this.showToastDiv = true; 
    setTimeout(() => {
      this.isVisible = true; 

      
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    }, 100); 
  }

  hideToast() {
    this.isVisible = false;
    setTimeout(() => {
      this.showToastDiv = false; 
    }, 500); 
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
     ; this.genericError = errore; 
      this.animateError()
    }
  }


  errorAlert(errore: string)
  {
    this.genericError = errore; 
    this.animateError();
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



