import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { Supplier } from '../model/Supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class FathersService {

  constructor(private http:HttpClient) { }

  getAllSuppliers():Observable<Supplier[]>
  {
    return this.http.get<Supplier[]>("/api/suppliers");
  }

  getAllCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>("/api/categories");
  }

  addSupplier(supplier:Supplier):Observable<Supplier>
  {
    return this.http.post<Supplier>(`/api/suppliers/addSupplier`, supplier);
  }

  addCategory(category:Category):Observable<Category>
  {
    return this.http.post<Category>(`/api/categories/addCategory`, category);
  }

  deleteSup(id:number): Observable<void>
  {
    return this.http.delete<void>(`/api/suppliers/${id}`);
  }
  
  deleteCat(id:number): Observable<void>
  {
    return this.http.delete<void>(`/api/categories/${id}`)
  }
}
