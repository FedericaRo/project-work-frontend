import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getOrdersInLast3Months():Observable<Order[]>
  {
    return this.http.get<Order[]>("/api/orders/recent");
  }

  updateOrderArrivalDetails(id: number, order: Order): Observable<any> 
  {
    console.log(`SERVICE ${id} ${order}`);
    return this.http.put<void>(`/api/orders/${id}/updateOrderArrivalDetails`, order);
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

  delete(id: number):Observable<Order>
  {
    return this.http.delete<Order>(`/api/orders/${id}`);
  }

  addOrder(productId:number, data:any):Observable<Order>
  {
    console.log("Sending data:", data);

    return this.http.post<Order>(`api/orders/${productId}/addOrder`, data);
    
  }

  deleteLastOrder(productName:string):Observable<any>
  {
    return this.http.delete<any>(`/api/orders/deleteLast/${productName}`);
  }

  sendOrders()
  {
    return this.http.get<Order[]>("/api/orders/sendOrders");
  }

}
