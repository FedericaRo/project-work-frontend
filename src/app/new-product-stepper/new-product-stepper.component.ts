import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FathersService } from '../services/fathers.service';
import { Category } from '../model/Category';
import { Supplier } from '../model/Supplier';
import { MatOptionModule } from '@angular/material/core';
import { Product } from '../model/Product';

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

  constructor(private fatherService:FathersService) {}

  ngOnInit(): void 
  {
    this.fatherService.getAllCategories().subscribe(data=>{this.categories=data; console.log(this.categories)});
    this.fatherService.getAllSuppliers().subscribe(data=>{this.suppliers=data; console.log(this.suppliers)});
  }

  // category!:Category;
  // supplier!:Supplier;

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
