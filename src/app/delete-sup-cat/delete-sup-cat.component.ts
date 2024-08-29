import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { Category } from '../model/Category';
import { FathersService } from '../services/fathers.service';

@Component({
  selector: 'app-delete-sup-cat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-sup-cat.component.html',
  styleUrl: './delete-sup-cat.component.css'
})
export class DeleteSupCatComponent implements OnInit
{

  constructor(private fatherService:FathersService){}

  suppliers:Supplier[] = [];
  categories:Category[]= [];

  ngOnInit(): void {
    this.fatherService.getAllSuppliers().subscribe(data => {
    this.suppliers = data.reverse();
    console.log(this.suppliers)
    });

    this.fatherService.getAllCategories().subscribe(data => {
      this.categories = data.reverse();
      console.log(this.categories)
    });
  }

  isToastVisibleCateg:boolean = true;
  showToastDivCateg = false;
  isVisibleC = false;

  showToastCateg(){
    this.showToastDivCateg = true;
    setTimeout(() => {
      this.isVisibleC = true;

      setTimeout(() => {
        this.hideToastCateg();
      }, 3000);
    }, 100);
  }
  
  hideToastCateg() {
    this.isVisibleC= false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showToastDivCateg = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  deleteCategory(id:number): void {
    this.fatherService.deleteCat(id).subscribe({
      next: data => {
        console.log("Categoria eliminata", data );
        // Update the previous unit quantity after successful edit
        this.categories = this.categories.filter(c => c.id !== id);
        this.showToastCateg();
      },
      error: badResponse => {
        console.log("Errore nell'eliminazione:", badResponse);
      }
    });
  } 
  

  isToastVisibleSup:boolean = true;
  showToastDivSup = false;
  isVisibleS = false;

  showToastSup(){
    this.showToastDivSup = true;
    setTimeout(() => {
      this.isVisibleS = true;

      setTimeout(() => {
        this.hideToastSup();
      }, 3000);
    }, 100);
  }
  
  hideToastSup() {
    this.isVisibleS= false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showToastDivSup = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  deleteSupplier(id:number):void {
    this.fatherService.deleteSup(id).subscribe({
      next: data => {
        console.log("Fornitore eliminato", data );
        // Update the previous unit quantity after successful edit
        this.suppliers = this.suppliers.filter(s => s.id !== id);
        this.showToastSup();
      },
      error: badResponse => {
        console.log("Errore nell'eliminazione:", badResponse);
      }
    });
  } 
  

}

