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

  updateOrderArrivalDetails(id: number, order: Order): Observable<any> {
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

  addOrder():void
  {
    const productId = 1;
    const data = {
      "packagingOrderedQuantity": 10,
      "unitOrderedQuantity": 5
    };

    console.log("Sending data:", data);

    this.http.post<any>(`api/orders/1/addOrder`, data)
    .subscribe(
      {

      next: data => {
        console.log(data);
      },
      error: badResponse => {
        console.log("Error AAAAAAAAAAAAAAAAAAAA:", badResponse);

      }})
  }

}
