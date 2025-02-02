import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Order } from '../model/Order';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'tr[app-order]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order!: Order; 
  @Output() newDeleteEvent:EventEmitter<Order> = new EventEmitter<Order>();
  @Output() orderUpdated: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() showErrorAlert = new EventEmitter<string>();


  previousPackagingQuantity: number = 0;
  previousUnitQuantity: number = 0;

  constructor(public orderService: OrdersService, public authService: AuthService) { }

  ngOnInit(): void {
    if (this.order) {
      this.previousPackagingQuantity = this.order.packagingOrderedQuantity;
      this.previousUnitQuantity = this.order.unitOrderedQuantity;
    }
  }

  isRestrictedEditModeActiveUnits: boolean = true;
  isRestrictedEditModeActivePackage: boolean = true;
  isFullEditModeActive: boolean = false;

  employeeEditProductUnitsToggle() {
    this.isRestrictedEditModeActiveUnits = !this.isRestrictedEditModeActiveUnits;
  }

  employeeEditProductPackageToggle() {
    this.isRestrictedEditModeActivePackage = !this.isRestrictedEditModeActivePackage;
  }

  isPackToastVisible:boolean = true;
  showPackToastDiv = false;
  isVisiblePa = false;

  showPackToast(){
    this.showPackToastDiv = true;
    setTimeout(() => {
      this.isVisiblePa = true;

      setTimeout(() => {
        this.hidePackToast();
      }, 3000);
    }, 100);
  }
  
  hidePackToast() {
    this.isVisiblePa = false;
    setTimeout(() => {
      this.showPackToastDiv = false; 
    }, 500); 
  }

  editPackagingQuantity() {
    console.log("Editing packaging quantity...");
    console.log("Current packaging ordered quantity:", this.order.packagingOrderedQuantity);
    console.log("Previous packaging ordered quantity:", this.previousPackagingQuantity);

    if (
        this.order.packagingOrderedQuantity !== this.previousPackagingQuantity &&
        this.isPositiveInteger(this.order.id)                                  && 
        this.isPositiveInteger(this.order.packagingOrderedQuantity)
      ) 
    {
      console.log("Sending request to update packaging quantity...");
      this.orderService.editPackagingQuantity(this.order.id, this.order.packagingOrderedQuantity).subscribe({
        next: data => {
          console.log("Packaging quantity updated successfully");
          this.previousPackagingQuantity = this.order.packagingOrderedQuantity;
          this.showPackToast();
        },
        error: badResponse => {
          console.log("Error updating packaging quantity:", badResponse);
          this.showErrorAlert.emit(badResponse.error)
          this.order.packagingOrderedQuantity = this.previousPackagingQuantity;

        }
      });
    } else {
      console.log("No changes in packaging quantity, request not sent");
      this.order.packagingOrderedQuantity = this.previousPackagingQuantity;

    }
  }

  isUnitToastVisible:boolean = true;
  showUnitToastDiv = false;
  isVisibleUt = false;

  showUnitToast(){
    this.showUnitToastDiv = true;
    setTimeout(() => {
      this.isVisibleUt = true;

      setTimeout(() => {
        this.hideUnitToast();
      }, 3000);
    }, 100);
  }
  
  hideUnitToast() {
    this.isVisibleUt = false; 
    setTimeout(() => {
      this.showUnitToastDiv = false; 
    }, 500); 
  }

  editUnitQuantity() {
    console.log("Edit unit quantity triggered");
    console.log("Current unit ordered quantity:", this.order.unitOrderedQuantity);
    console.log("Previous unit ordered quantity:", this.previousUnitQuantity);

    if 
      (
        this.order.unitOrderedQuantity !== this.previousUnitQuantity && 
        this.isPositiveInteger(this.order.id)                        && 
        this.isPositiveInteger(this.order.unitOrderedQuantity)) 
      {
      console.log("Sending request to update unit quantity...");
      this.orderService.editUnitQuantity(this.order.id, this.order.unitOrderedQuantity).subscribe({
        next: data => {
          console.log("Unit quantity updated successfully", );
          this.previousUnitQuantity = this.order.unitOrderedQuantity;
          this.showUnitToast();
        },
        error: badResponse => {
          console.log("Error updating unit quantity:", badResponse);
          this.showErrorAlert.emit(badResponse.error)
        }
      });
    } else {
      console.log("No changes in unit quantity, request not sent");
      this.order.unitOrderedQuantity = this.previousUnitQuantity;
    }
  }

  updateOrderArrival() 
  {
    console.log("ORDER TO SEND", this.order);
    this.orderService.updateOrderArrivalDetails(this.order.id, this.order).subscribe({

      next: data => {
        this.order = data;
        console.log("Arrived DATA", this.order)
        console.log(this.order.arrived)
        this.orderUpdated.emit(this.order); 
      },
      error: badResponse => {
        console.log("Error updating arrived status:", badResponse);
        this.showErrorAlert.emit(badResponse.error)
      }
    });
  }

  deleteOrder()
  {
    this.isPopoverVisible = false;
    this.orderService.delete(this.order.id).subscribe({

      next: data => {
        this.newDeleteEvent.emit(data)
        console.log("Order deleted successfully:", data);
        
      },
      error: badResponse => {
        console.log("Error deleting order:", badResponse);
        this.showErrorAlert.emit(badResponse.error)


      }
    });
  }

  checkArrivalDate(deliverDateString: string): boolean {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    let deliverDate = new Date(deliverDateString);
    deliverDate.setHours(0, 0, 0, 0);


    let diffInMs = Math.abs(now.getTime() - deliverDate.getTime());
    let diffInHrs = diffInMs / (1000 * 60 * 60);
    console.log(`Deliver Date: ${deliverDate.toISOString()}, Current Time: ${now}, Difference in Hours: ${diffInHrs}`);
    return diffInHrs > 24;
  }

  isPopoverVisible: boolean = false;

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const popoverElement = document.querySelector('.popoverConfirm'); 

    if (popoverElement && !popoverElement.contains(buttonElement) && !buttonElement.closest('button')) {
      this.isPopoverVisible = false; 
    }
  }

  
  /**
 * Checks if the given value is a positive integer.
 * @param value - The value to check.
 * @returns `true` if the value is a positive integer, `false` otherwise.
 */
  isPositiveInteger(value: number): boolean 
  {
    return Number.isInteger(value) && value >= 0;
  }
}
