import { Component } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderComponent, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent 
{
  constructor(private orderService:OrdersService){ }


  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  
  showPopover = false;

  confirmCancellation() {
    // Add logic for confirming cancellation
    console.log('Cancellation confirmed');
    this.showPopover = false;
  }

  cancelPopover() {
    // Add logic for canceling the popover
    this.showPopover = false;
  }
  
  filterCriteria:string = '';

  
  ngOnInit(): void 
  {
    this.orderService.getAll().subscribe(data => {
    this.orders = data;
    this.ordersBackup = data;
    console.log(this.orders)})
  }
      
  orders:Order[] = []; 
  ordersBackup:Order[] = [];

  filter(): void 
  {
    if (this.filterCriteria) 
      {
      const criteria = this.filterCriteria.toLowerCase();
      this.orders = this.ordersBackup.filter(order =>
        this.matchesCriteria(order, criteria)
      );
    } 
    else 
    {
      this.orders = [...this.ordersBackup];
    }
  }

  private matchesCriteria(order: Order, criteria: string): boolean 
  {
    return Object.values(order).some(value =>
      value.toString().toLowerCase().includes(criteria)
    );
  }
      
  deleteOrder(order:Order) 
  {
    let index = this.orders.findIndex((o: Order) => o.id === order.id);
    if (index !== -1) 
    {
      this.orders.splice(index, 1);
    }
  }
      
  
}