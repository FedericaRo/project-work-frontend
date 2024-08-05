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
}
