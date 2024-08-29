import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FathersService } from '../services/fathers.service';
import { ProductsiblingsService } from '../services/productsiblings.service';

@Component({
  selector: 'app-new-category-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon, FormsModule, MatError],
  templateUrl: './new-category-form.component.html',
  styleUrl: './new-category-form.component.css'
})
export class NewCategoryFormComponent {
  
  constructor(private fatherService:FathersService, private productsSibling:ProductsiblingsService){}

  @Output() toggleForm = new EventEmitter<boolean>();
  @Output() showToast = new EventEmitter<Event>();
  @Output() showErrorAlert = new EventEmitter<string>();
  
  formState:boolean = false;

  categoryForm:FormGroup = new FormGroup
  ({
    name: new FormControl('', Validators.required),
  });
  
  
  toggleFormNewCategory():void
  {
    this.categoryForm.reset();

    // this.categoryForm.markAsUntouched();
    // this.categoryForm.markAsPristine();
    this.toggleForm.emit(this.formState);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const modalElement = document.querySelector('.category-form'); // Make sure this matches the popover class

    // Check if the click target is outside the popover and the button
    if (modalElement && !modalElement.contains(clickedElement) && !clickedElement.closest('button')) {
      this.toggleForm.emit(false);
      this.categoryForm.reset();
    }
  }


  createNewCategory() 
  {
    this.toggleForm.emit(false);
    // this.categoryForm.markAsUntouched();
    // this.categoryForm.markAsPristine();
    console.log(this.categoryForm.value);
    this.fatherService.addCategory(this.categoryForm.value)
    .subscribe(
      {
        next: data => {
          console.log(data);
          this.productsSibling.addCategory(data);
          this.showToast.emit();
        },
        error: badResponse => {
          console.log("Error:", badResponse);
          this.showErrorAlert.emit(badResponse.error)
        }
      }
    )
    this.categoryForm.reset();
  }
}
