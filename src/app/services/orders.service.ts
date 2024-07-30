import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  
  constructor(private http:HttpClient) { }
  
  getAll():Observable<Order[]>
  {
    return this.http.get<Order[]>("/api/orders");
  }

  changeArrivedStatus(id:number, arrivedStatus:boolean):Observable<any>
  {
    console.log(`SERVICE ${id} ${arrivedStatus}`)
    return this.http.put<any>(`/api/orders/${id}/changeArrivedStatus`, {arrivedStatus});
  }
  

  editPackagingQuantity(id: number, packagingOrderedQuantity: number) 
  {
    console.log(`SERVICE ${id} ${packagingOrderedQuantity}`)
    return this.http.put<number>(`/api/orders/${id}/editPackagingQuantity`, {packagingOrderedQuantity});
  }

  editUnitQuantity(id: number, unitOrderedQuantity: number) 
  {
    console.log(`SERVICE ${id} ${unitOrderedQuantity}`)
    return this.http.put<number>(`/api/orders/${id}/editUnitQuantity`, {unitOrderedQuantity});
  }

  delete(id: number):Observable<any>
  {
    return this.http.delete<any>(`/api/orders/${id}`);
  }

}
