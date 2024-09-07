import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { Supplier } from '../model/Supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>
  {
    return this.http.get<Product[]>("/api/products");
  }

  // ? Perché questo metodo è nel servizio e non direttamente nel product list?
  filterProducts(products:Product[], criteria:string):Product[] | any
  {
    products.filter(p => p.categoryName == criteria);
  }

  newProduct(product:Product):Observable<Product>
  {
    return this.http.post<Product>(`/api/products/newProduct`, product);
  }

  addCategory(category:Category):Observable<Category>
  {
    return this.http.post<Category>(`/api/products/addCategory`, category);
  }

  delete(id:number):Observable<number>
  {
    return this.http.delete<number>(`/api/products/${id}`);
  }

  updateRemainingUnitsQuantity(id: number, unitTypeQuantity: number)
  {
    console.log(`SERVICE ${id} ${unitTypeQuantity}`)
    return this.http.put<Product>(`/api/products/${id}/updateRemainingUnitsQuantity`, { unitTypeQuantity });
  }

  updateRemainingPackagesQuantity(id: number, packagingTypeQuantity: number)
  {
    console.log(`SERVICE ${id} ${packagingTypeQuantity}`)
    return this.http.put<Product>(`/api/products/${id}/updateRemainingPackagesQuantity`, { packagingTypeQuantity });
  }
}