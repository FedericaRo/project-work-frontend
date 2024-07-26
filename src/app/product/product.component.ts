import { Component, Input } from '@angular/core';
import { Product } from '../model/Product';

@Component({
  selector: 'tr[app-product]',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent 
{

  @Input() product!:Product;

  stockQuantity():number
  {
    return this.product.unitTypeQuantity+(this.product.unitsPerPackaging*this.product.packagingTypeQuantity)
  }
}
