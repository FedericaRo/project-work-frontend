import { Component, Input } from '@angular/core';
import { Product } from '../model/Product';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'tr[app-product]',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent 
{

  constructor(public authService:AuthService){}

  @Input() product!:Product;

  isRestrictedEditModeActiveUnits:boolean = true;
  isRestrictedEditModeActivePackage:boolean = true;
  isFullEditModeActive:boolean = false;


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
