import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from '../model/Supplier';
import { FathersService } from './fathers.service';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductsiblingsService {

  // Subjects to hold the current state of categories and suppliers
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private suppliersSubject: BehaviorSubject<Supplier[]> = new BehaviorSubject<Supplier[]>([]);

  // Observable streams to allow components to subscribe to the state
  public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  public suppliers$: Observable<Supplier[]> = this.suppliersSubject.asObservable();

  constructor(private fatherService: FathersService) {
    this.loadData();
  }


  // Load initial categories and supplier data for categories and suppliers from the backend
  private loadData(): void {
    this.fatherService.getAllCategories().subscribe(data => {
      this.categoriesSubject.next(data);
      console.log('Categories loaded:', data);
    });

    this.fatherService.getAllSuppliers().subscribe(data => {
      this.suppliersSubject.next(data);
      console.log('Suppliers loaded:', data);
    });
  }

  setCategories(categories: Category[]): void {
    this.categoriesSubject.next(categories);
    console.log('Categories updated:', categories);
  }

  setSuppliers(suppliers: Supplier[]): void {
    this.suppliersSubject.next(suppliers);
    console.log('Suppliers updated:', suppliers);
  }

  // Add a new supplier to the list
  addSupplier(newSupplier: Supplier): void {
    const currentSuppliers = this.suppliersSubject.value;
    this.suppliersSubject.next([...currentSuppliers, newSupplier]);
    console.log('Supplier added:', newSupplier);
    console.log('Updated suppliers list:', this.suppliersSubject.value);
  }

  // Add a new category to the list.
  addCategory(newCategory: Category): void {
    const currentCategories = this.categoriesSubject.value;
    this.categoriesSubject.next([...currentCategories, newCategory]);
    console.log('Category added:', newCategory);
    console.log('Updated categories list:', this.categoriesSubject.value);
  }
}

    
