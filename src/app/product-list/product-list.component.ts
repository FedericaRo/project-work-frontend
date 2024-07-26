import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/Product';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
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
    
    
    ngOnInit(): void 
    {
        this.productService.getAll().subscribe(data => {
        this.products = data;
        console.log(this.products)})
      
    }

      
  }




