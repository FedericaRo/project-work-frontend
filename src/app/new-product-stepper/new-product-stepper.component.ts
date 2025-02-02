import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FathersService } from '../services/fathers.service';
import { Category } from '../model/Category';
import { Supplier } from '../model/Supplier';
import { MatOptionModule } from '@angular/material/core';
import { Product } from '../model/Product';
import { ProductsiblingsService } from '../services/productsiblings.service';

@Component({
  selector: 'app-new-product-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule
  ],
  templateUrl: './new-product-stepper.component.html',
  styleUrl: './new-product-stepper.component.css'
})
export class NewProductStepperComponent implements OnInit{

  categories:Category[] = [];
  suppliers:Supplier[] = [];

  constructor(private productsSibling:ProductsiblingsService){}

  ngOnInit(): void {
    this.productsSibling.categories$.subscribe(categories => {
      this.categories = categories;
      console.log('Categories received:', this.categories);
    });

    this.productsSibling.suppliers$.subscribe(suppliers => {
      this.suppliers = suppliers;
      console.log('Suppliers received:', this.suppliers);
    });
  }


  @Output() toggleForm = new EventEmitter<boolean>();
  @Output() createProduct = new EventEmitter<Product>();

  formState:boolean = false;
  isLinear = false;

  createProductForm:FormGroup = new FormGroup
  ({
    productName:           new FormControl('', Validators.required),
    unitPrice:             new FormControl('', Validators.required),
    unitType:              new FormControl('', Validators.required),
    unitTypeQuantity:      new FormControl(0, Validators.required),
    packagingType:         new FormControl('', Validators.required),
    packagingTypeQuantity: new FormControl(0, Validators.required),
    unitsPerPackaging:     new FormControl('', Validators.required),
    categoryName:          new FormControl('', Validators.required),
    supplierName:          new FormControl('', Validators.required),
    reorderPoint:          new FormControl('', Validators.required),
    code:                  new FormControl('', Validators.required),
  })

  toggleFormNewProduct():void
  {
    this.toggleForm.emit(this.formState);
  }

  emitCreationEvent():void
  {
    this.createProduct.emit(this.createProductForm.value);
    console.log(this.createProductForm.value);
    this.createProductForm.reset();
  }
}
