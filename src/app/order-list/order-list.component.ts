import { Component } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, OrderComponent, FormsModule, MatIcon],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent 
{
  constructor(private orderService:OrdersService, private loadingService:LoadingService){}

  sortColumn: string = 'id'; // Default sorting column
  orderingMap: { [key: string]: 'default' | 'asc' | 'desc' } = {}; // Map to store ordering type for each column
  displayRecentOrders:boolean = true;
        
  orders: Order[] = []; // Currently displayed orders
  allOrders: Order[] = [];
  ordersLastThreeMonths: Order[] = [];
  ordersLastThreeMonthsBackup: Order[] = []; // Original list of orders
  ordersLastDayAndNotArrived: Order[] = [];
  ordersLastDayAndNotArrivedBackup: Order[] = [];



  /**
   * mi serve 
   * order nell'ultimi 3 mesi
   * orders negli ultimi 3 mesi e non arrivati
   * order 1 back up 
   * order 2 back up
   */
  ngOnInit(): void {
    this.orderService.getOrdersInLast3Months().subscribe(data => {
      console.log("Data received from service:", data);
      this.allOrders = data.reverse();
      
      this.ordersLastThreeMonths = this.showOnlyOlderOrders(); 
      this.ordersLastThreeMonthsBackup = [...this.ordersLastThreeMonths];
  
      this.ordersLastDayAndNotArrived = this.showOnlyRecentOrders(); 
      this.ordersLastDayAndNotArrivedBackup = [...this.ordersLastDayAndNotArrived];
  
      this.orders = [...this.ordersLastDayAndNotArrived];
      console.log("Initial orders displayed:", this.orders);
    });
  }


  // Aggiorna lo stato degli ordini nel componente padre quando l'ordine viene aggiornato nel figlio
  onOrderUpdated(updatedOrder: Order) {
    // Aggiorna tutte le liste
    this.updateList(this.ordersLastThreeMonths, updatedOrder);
    this.ordersLastThreeMonthsBackup = this.ordersLastThreeMonths
    this.updateList(this.ordersLastDayAndNotArrived, updatedOrder);
    this.ordersLastDayAndNotArrivedBackup = this.ordersLastDayAndNotArrived


    // Dopo l'aggiornamento, rifiltra e riordina la lista attualmente visualizzata
    this.filter();
    this.sortData();
  }

  private updateList(list: Order[], updatedOrder: Order) {
    const index = list.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      // Aggiorna l'ordine nella lista
      list[index] = updatedOrder;
    }
  }

  
  showOnlyRecentOrders(): Order[] {
    console.log("Filtering recent orders...");
    return this.allOrders.filter(o => {
      if (!o.arrived) { 
        console.log(`Order ID: ${o.productCode} has not arrived yet.`);
        return true;
      }
      const timeDiff = this.getTimeDifferenceBetweenDates(o.deliverDate);
      console.log(`Order ID: ${o.productCode}, Arrived: ${o.arrived}, Time Difference: ${timeDiff} hours`);
      return timeDiff <= 24;
    });
  }
  
  
  showOnlyOlderOrders(): Order[] {
    console.log("Filtering older orders...");
      return this.allOrders.filter(o => {
        if (o.arrived) {
          const timeDiff = this.getTimeDifferenceBetweenDates(o.deliverDate);
          console.log(`Order ID: ${o.id}, Arrived: ${o.arrived}, Time Difference: ${timeDiff} hours`);
          return timeDiff > 24;
        }
        console.log(`Order ID: ${o.id} has not arrived yet or does not meet the criteria.`);
        return false; 
      });
    
  
  }
  

  toggleBetweenRecentandOlderOrders() {
    console.log("Display recent orders: ", this.displayRecentOrders);
    console.log("Current orders before toggle: ", this.orders);

    if (!this.displayRecentOrders) {
      console.log("Switching to show recent orders");
      this.orders = this.ordersLastDayAndNotArrived;
      this.displayRecentOrders = true;
    } else {
      console.log("Switching to show all orders");
      this.orders = this.ordersLastThreeMonths; 
      this.displayRecentOrders = false; 
      
    }
    this.filterCriteria = "";
    this.resetSorting();

    console.log("Updated displayRecentOrders: ", this.displayRecentOrders);
    console.log("Updated orders after toggle: ", this.orders);
    console.log("TOGGLE METHOD END *******************");

  }
  

  private getTimeDifferenceBetweenDates(deliverDateString: string): number {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    let deliverDate = new Date(deliverDateString);
    deliverDate.setHours(0, 0, 0, 0);


    let diffInMs = Math.abs(now.getTime() - deliverDate.getTime());
    let diffInHrs = diffInMs / (1000 * 60 * 60);
    console.log(`Deliver Date: ${deliverDate.toISOString()}, Current Time: ${now}, Difference in Hours: ${diffInHrs}`);
    return diffInHrs;
  }


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
    console.log('Cancellation confirmed');
    this.showPopover = false;
  }

  cancelPopover() {
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
    if (this.displayRecentOrders)
      this.orders = [...this.ordersLastDayAndNotArrivedBackup];
    else
      this.orders = [...this.ordersLastThreeMonthsBackup]
  
    if (orderingType !== 'default') {
      {
      this.orders = [...this.orders].sort((a, b) =>
        this.sortByColumn(a, b, this.sortColumn, orderingType)
      );
    }
  }
  }
  

  private sortByColumn(a: Order, b: Order, sortColumn: string, orderingType: 'asc' | 'desc' | 'default'): number {
    const valueA = a[sortColumn as keyof Order];
    const valueB = b[sortColumn as keyof Order];

  if (valueA == null && valueB == null) {
    return 0; 
  } else if (valueA == null) { 
    return orderingType === 'asc' ? 1 : -1;
  } else if (valueB == null) {
    return orderingType === 'asc' ? -1 : 1;
  }
  
    if (typeof valueA === 'string' && typeof valueB === 'string')
      return orderingType === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    else if (typeof valueA === 'number' && typeof valueB === 'number')
      return orderingType === 'asc' ? valueA - valueB : valueB - valueA;
    else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return orderingType === 'asc'
        ? (valueA === valueB ? 0 : valueA ? 1 : -1)
        : (valueA === valueB ? 0 : valueA ? -1 : 1);
    } 
   
    else
      throw new Error('Unsupported data type for sorting' + valueA);
  }

  resetSorting() {
    this.sortColumn = 'id'; 
    this.orderingMap = {}; 
  }
  


  filter(): void 
  {
    console.log('Filter criteria:', this.filterCriteria);

    if (this.displayRecentOrders)
      this.orders = [...this.ordersLastDayAndNotArrivedBackup];
    else
      this.orders = [...this.ordersLastThreeMonthsBackup];

    console.log('Orders before filtering:', this.orders);

    if (this.filterCriteria) 
    {
      const criteria = this.filterCriteria.toLowerCase();
      this.orders = this.orders.filter(order =>
        this.matchesCriteria(order, criteria)
      );
    } 
    else 
    {
      this.orders = [...this.orders];
    }

    console.log('Orders after filtering:', this.orders);
  }

private matchesCriteria(order: Order, criteria: string): boolean {
  const orderDate = this.formatDateToDDMMYYYY(new Date(order.orderDate)); 
  const deliverDate = this.formatDateToDDMMYYYY(new Date(order.deliverDate)); 

  const values = [orderDate, deliverDate, ...Object.values(order).filter(v => v != null)];
  console.log('Values to match:', values);
  console.log('Criteria:', criteria);

  return values.some(value =>
    value.toString().toLowerCase().includes(criteria)
  );
}

 

  private formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }


  isDeleteToastVisible: boolean = true;
  showDeleteToastDiv = false;
  isVisibleD = false;

  showDeleteToast(){
    this.showDeleteToastDiv = true;
    setTimeout(() => {
      this.isVisibleD = true;

      setTimeout(() => {
        this.hideDeleteToast();
      }, 3000);
    }, 100);
  }
  
  hideDeleteToast() {
    this.isVisibleD = false; 
    setTimeout(() => {
      this.showDeleteToastDiv = false; 
    }, 500); 
  }

  deleteOrder(order:Order) 
  {
    let index = this.orders.findIndex((o: Order) => o.id === order.id);
    if (index !== -1) 
    {
      this.orders.splice(index, 1);
    }
    this.showDeleteToast();
  }

  // mailError:string = '';
  genericError: string = '';

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
        this.loadingService.hide();
        console.log(err);
        this.genericError = err.error;
        console.log("Errore nell'invio: ", err.error);
        this.loadingService.hide();
        if(this.genericError != "")
          this.animateError();
      }
    });
  }

  errorAlert(errore: string)
  {
    this.genericError = errore; 
    this.animateError()
  }


  animateError() {
    const alertElement = document.getElementById('alert');
    if (alertElement) {
      alertElement.classList.add('show');
      setTimeout(() => {
        alertElement.classList.add('hide');
        setTimeout(() => {
          alertElement.classList.remove('show', 'hide');
        }, 500); // Durata dell'animazione di uscita
      }, 5000); // Durata della visualizzazione
    }
  }

  playSound(audioElement: HTMLAudioElement):void
  {
    audioElement.play();
  }
}