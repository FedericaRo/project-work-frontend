import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/Product';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule, FormsModule],
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

    sortByCategory():void
    {
      this.products = this.products.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    }

    sortBySupplier():void
    {
      this.products = this.products.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
    }

    sortByCode():void
    {
      this.products = this.products.sort((a, b) => a.supplierCode.localeCompare(b.supplierCode));
    }

    sortQuantityRemaining():void
    {
      this.products = this.products.sort((a, b) => (a.unitTypeQuantity+(a.unitsPerPackaging*a.packagingTypeQuantity))-(b.unitTypeQuantity+(b.unitsPerPackaging*b.packagingTypeQuantity)));
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
          if(product.supplierCode.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.supplierCode.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.supplierName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.categoryName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          else if(product.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.products = this.products.filter(p => p.productName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        }
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



