import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/Product';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewProductStepperComponent } from "../new-product-stepper/new-product-stepper.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, FormsModule, MatTooltipModule, NewProductStepperComponent, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit
{

  constructor(private productService:ProductsService)
  {
    // this.productService.getAll().subscribe(data => {
    // this.products = data;
  }
    openCreateProductStepper:boolean = false;
    isDialOpen:boolean = false;
    categoryCounter:number = 0;
    supplierCounter:number = 0;
    codeCounter:number = 0;
    quantityRemainingCounter:number = 0;

    products:Product[] = []; 

    productsBackup:Product[] = [];
    
    filterCriteria:string = '';
    
    ngOnInit(): void 
    {
        this.productService.getAll().subscribe(data => {
        this.products = data;
        console.log(this.products)})

        this.productService.getAll().subscribe(data => {

        this.productsBackup = data;});
      
    }

    toggleDial():void
    {
      this.isDialOpen = !this.isDialOpen;
    }

    toggleDialDaFiglio(value:boolean):void
    {
      this.openCreateProductStepper = value;
      console.log(value);
    }

    toggleStepperCreate():void
    {
      this.openCreateProductStepper = !this.openCreateProductStepper;
    }

    sortByCategory():void
    {
      this.categoryCounter++;
      let valore = this.categoryCounter % 3;
      // this.products = this.products.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      if (valore == 0)
      {
        this.products = this.productsBackup;
        
      }
      if (valore == 1)
      {
        this.products = [...this.productsBackup].sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      }
      if (valore == 2)
      {
        this.products = [...this.productsBackup].sort((a, b) => b.categoryName.localeCompare(a.categoryName));
      }

      
    }

    sortBySupplier():void
    {

      this.supplierCounter++;
      let valore = this.supplierCounter % 3;
      // this.products = this.products.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      if (valore == 0)
      {
        this.products = this.productsBackup;
      }
      if (valore == 1)
      {
        this.products = [...this.productsBackup].sort((a, b) => a.supplierName.localeCompare(b.supplierName));
      }
      if (valore == 2)
      {
        this.products = [...this.productsBackup].sort((a, b) => b.supplierName.localeCompare(a.supplierName));
      }

      // this.products = this.products.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    }


    /**
     * *Questo metodo è diventato inutile dato che sortare per un eloemento univoco non ha senso
     * *Lo lascio comunque per ricordo :)
     */
    sortByCode():void
    {

      this.codeCounter++;
      let valore = this.codeCounter % 3;
      // this.products = this.products.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      if (valore == 0)
      {
        this.products = this.productsBackup;
      }
      if (valore == 1)
      {
        this.products = [...this.productsBackup].sort((a, b) => a.code.localeCompare(b.code));
      }
      if (valore == 2)
      {
        this.products = [...this.productsBackup].sort((a, b) => b.code.localeCompare(a.code));
      }

      // this.products = this.products.sort((a, b) => a.supplierCode.localeCompare(b.supplierCode));
    }

    sortQuantityRemaining():void
    {
      // this.products = this.products.sort((a, b) => (a.unitTypeQuantity+(a.unitsPerPackaging*a.packagingTypeQuantity))-(b.unitTypeQuantity+(b.unitsPerPackaging*b.packagingTypeQuantity)));

      this.quantityRemainingCounter++;
      let valore = this.quantityRemainingCounter % 3;
      // this.products = this.products.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      if (valore == 0)
      {
        this.products = this.productsBackup;
      }
      if (valore == 1)
      {
        this.products = [...this.productsBackup].sort((a, b) => (a.unitTypeQuantity+(a.unitsPerPackaging*a.packagingTypeQuantity))-(b.unitTypeQuantity+(b.unitsPerPackaging*b.packagingTypeQuantity)));
      }
      if (valore == 2)
      {
        this.products = [...this.productsBackup].sort((a, b) => (b.unitTypeQuantity+(b.unitsPerPackaging*b.packagingTypeQuantity))-(a.unitTypeQuantity+(a.unitsPerPackaging*a.packagingTypeQuantity)));
      }
    }

    
    /**
     * Questo filtro agisce tramite un filterCriteria bindato con un ngModel nell'HTML
     * che si aggiorna dinamicamente in base a ciò che si scrive.
     */
    filterByEverything():void 
    {
      this.products = this.productsBackup;
      
      for(let product of this.products)
        {
          if(product.code.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.code.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        }
      }

      flashId:number | null = null;
      
      saveNewProduct(product:Product)
      {
        this.productService.newProduct(product)
        .subscribe
        (
          {
            next: data =>
            {
              console.log(data);
              this.products.unshift(data);
              this.flashId = data.id;
              this.toggleStepperCreate();

              setTimeout(() => {
                this.flashId = null;
              }, 500);

            },
            error: badResponse=>
            {
              console.error("Errore nell'aggiunta di un nuovo prodotto", badResponse)
            },
          }
        )
      }

    }
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



