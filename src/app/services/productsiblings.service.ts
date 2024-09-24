import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from '../model/Supplier';
import { FathersService } from './fathers.service';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductsiblingsService {

  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private suppliersSubject: BehaviorSubject<Supplier[]> = new BehaviorSubject<Supplier[]>([]);

  public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  public suppliers$: Observable<Supplier[]> = this.suppliersSubject.asObservable();

  constructor(private fatherService: FathersService) {
    this.loadData();
  }

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

  addSupplier(newSupplier: Supplier): void {
    const currentSuppliers = this.suppliersSubject.value;
    this.suppliersSubject.next([...currentSuppliers, newSupplier]);
    console.log('Supplier added:', newSupplier);
    console.log('Updated suppliers list:', this.suppliersSubject.value);
  }

  addCategory(newCategory: Category): void {
    const currentCategories = this.categoriesSubject.value;
    this.categoriesSubject.next([...currentCategories, newCategory]);
    console.log('Category added:', newCategory);
    console.log('Updated categories list:', this.categoriesSubject.value);
  }
}

    
