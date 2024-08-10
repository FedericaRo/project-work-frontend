import { Component } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderComponent, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent 
{
  constructor(private orderService:OrdersService, private loadingService:LoadingService){}

  sortColumn: string = 'id'; // Default sorting column
  orderingMap: { [key: string]: 'default' | 'asc' | 'desc' } = {}; // Map to store ordering type for each column



  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  showDoneAnimation = false;
  showPopover = false;

  toggleDoneAnimation()
  {
    this.showDoneAnimation = !this.showDoneAnimation;
  }

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


  sort(column: string) {
    if (this.sortColumn === column) {
      // Se la colonna è già ordinata e lo stato è 'default', cambia in 'asc'
      if (this.orderingMap[column] === 'default') {
        this.orderingMap[column] = 'asc';
      } else if (this.orderingMap[column] === 'asc') {
        // Cambia in 'desc'
        this.orderingMap[column] = 'desc';
      } else {
        // Cambia in 'default'
        this.orderingMap[column] = 'default';
      }
    } else {
      // Imposta la nuova colonna e il suo stato iniziale a 'default'
      this.sortColumn = column;
      this.orderingMap[column] = 'asc';
    }
    console.log(this.orderingMap[column]);
    this.sortData();
  }
  

  private sortData() {
    const orderingType = this.orderingMap[this.sortColumn] || 'default';
  
    if (orderingType === 'default') {
      this.orders = [...this.ordersBackup];
    } else {
      this.orders = [...this.ordersBackup].sort((a, b) =>
        this.sortByColumn(a, b, this.sortColumn, orderingType)
      );
    }
  }
  
  

  private sortByColumn(a: Order, b: Order, sortColumn: string, orderingType: 'asc' | 'desc' | 'default'): number {
    const valueA = a[sortColumn as keyof Order];
    const valueB = b[sortColumn as keyof Order];
  
    if (typeof valueA === 'string' && typeof valueB === 'string')
      return orderingType === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    else if (typeof valueA === 'number' && typeof valueB === 'number')
      return orderingType === 'asc' ? valueA - valueB : valueB - valueA;
    else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return orderingType === 'asc'
        ? (valueA === valueB ? 0 : valueA ? 1 : -1)
        : (valueA === valueB ? 0 : valueA ? -1 : 1);
    } else
      throw new Error('Unsupported data type for sorting');
  }
  

  
  ngOnInit(): void 
  {
    this.orderService.getAll().subscribe(data => {
    this.orders = data.reverse();
    this.ordersBackup = this.orders;
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

  /**
   * * Metodo fierissimo che mostra una spunta di operazione completata compresa di audio.
   * @Santo
   * @param audioElement 
   */
  mailOrders(audioElement: HTMLAudioElement)
  {
    this.loadingService.show();
    this.orderService.sendOrders()
    .subscribe(
      {next: data => {
        console.log(data);
        this.loadingService.hide();
        setTimeout(() => this.playSound(audioElement), 1000);
        this.toggleDoneAnimation();
        setTimeout(() => this.toggleDoneAnimation(), 2000);
      }, 
      error: err => {
        console.log("ahi, ahi", err);
      }
    });
  }

  playSound(audioElement: HTMLAudioElement):void
  {
    audioElement.play();
  }
}