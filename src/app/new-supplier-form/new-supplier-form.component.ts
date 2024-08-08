import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-supplier-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon, FormsModule, MatError],
  templateUrl: './new-supplier-form.component.html',
  styleUrl: './new-supplier-form.component.css'
})
export class NewSupplierFormComponent 
{

  @Output() toggleForm = new EventEmitter<boolean>();
  
  formState:boolean = false;

  supplierForm:FormGroup = new FormGroup
  ({
    supplierName: new FormControl('', Validators.required),
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
    this.supplierForm.reset();
    // this.supplierForm.markAsUntouched();
    // this.supplierForm.markAsPristine();
    console.log("here");
    throw new Error('Method not implemented.');
  }

}
