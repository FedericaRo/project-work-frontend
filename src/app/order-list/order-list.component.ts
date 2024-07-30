import { Component } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent 
{
  constructor(private orderService:OrdersService){ }
    
  
  ngOnInit(): void 
  {
    this.orderService.getAll().subscribe(data => {
      this.orders = data;
      console.log(this.orders)})
      
      this.orderService.getAll().subscribe(data => {
        this.ordersBackup = data;});
        
  }
      
  showModal:boolean = false;
  orders:Order[] = []; 
  ordersBackup:Order[] = [];
  
  
  toggleModal() 
  {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }
}