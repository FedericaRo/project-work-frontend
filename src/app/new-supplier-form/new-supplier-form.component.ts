import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../services/products.service';
import { FathersService } from '../services/fathers.service';
import { Supplier } from '../model/Supplier';

@Component({
  selector: 'app-new-supplier-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon, FormsModule, MatError],
  templateUrl: './new-supplier-form.component.html',
  styleUrl: './new-supplier-form.component.css'
})
export class NewSupplierFormComponent 
{
  constructor(private fatherService:FathersService){}

  @Output() toggleForm = new EventEmitter<boolean>();
  @Output() newSupplierEvent:EventEmitter<Supplier> = new EventEmitter<Supplier>();

  
  formState:boolean = false;

  supplierForm:FormGroup = new FormGroup
  ({
    name: new FormControl('', Validators.required),
  });
  
  toggleFormNewSupplier():void
  {
    this.supplierForm.reset();

    // this.supplierForm.markAsUntouched();
    // this.supplierForm.markAsPristine();
    this.toggleForm.emit(this.formState);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const modalElement = document.querySelector('.supplier-form'); // Make sure this matches the popover class

    // Check if the click target is outside the popover and the button
    if (modalElement && !modalElement.contains(clickedElement) && !clickedElement.closest('button')) {
      this.toggleForm.emit(false);

      this.supplierForm.reset();
    }
  }
  
  createNewSupplier() 
  {
    this.toggleForm.emit(false);
    // this.supplierForm.markAsUntouched();
    // this.supplierForm.markAsPristine();
    console.log(this.supplierForm.value);
    this.fatherService.addSupplier(this.supplierForm.value)
    .subscribe(
      {
        next: data => {
          console.log(data);
          this.newSupplierEvent.emit(data); // ! NON VIENE CATCHATA
        },
        error: badResponse => {
          console.log("Error:", badResponse);
        }
      }
    )
    this.supplierForm.reset();
  }

}
