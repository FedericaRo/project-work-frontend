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

 

  deleteCategory(id:number): void {
    this.fatherService.deleteCat(id).subscribe({
      next: data => {
        console.log("Categoria eliminata", data );
        // Update the previous unit quantity after successful edit
        this.categories = this.categories.filter(c => c.id !== id);
      },
      error: badResponse => {
        console.log("Errore nell'eliminazione:", badResponse);
      }
    });
  } 
  



  deleteSupplier(id:number):void {
    this.fatherService.deleteSup(id).subscribe({
      next: data => {
        console.log("Fornitore eliminato", data );
        // Update the previous unit quantity after successful edit
        this.suppliers = this.suppliers.filter(s => s.id !== id);
      },
      error: badResponse => {
        console.log("Errore nell'eliminazione:", badResponse);
      }
    });
  } 
  

}

