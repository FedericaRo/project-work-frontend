import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:Product[]=[];

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>
  {
    return this.http.get<Product[]>("/api/products")
  }
}
