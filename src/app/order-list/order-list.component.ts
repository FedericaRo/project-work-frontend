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

  // sort(sortColumn:string)
  // {
  //   this.orders = [...this.ordersBackup].sort((a,b) => this.sortByColumn(a, b, orderingType))
  // }

  
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

  private matchesCriteria(order: Order, criteria: string): boolean {
    const orderDate = this.formatDateToDDMMYYYY(new Date(order.orderDate)); // convert orderDate to 'dd-MM-yyyy' format
    const deliverDate = this.formatDateToDDMMYYYY(new Date(order.deliverDate)); // convert deliverDate to 'dd-MM-yyyy' format

    const values = [orderDate, deliverDate, ...Object.values(order).filter(v => v != null)];
    return values.some(value =>
      value.toString().toLowerCase().includes(criteria)
    );
  }

  private formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2-digit month (Month is 0-indexed)
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
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