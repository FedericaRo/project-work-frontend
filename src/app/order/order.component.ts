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
  @Input() order!: Order; // Use non-null assertion since we expect it to be provided
  @Output() newDeleteEvent:EventEmitter<Order> = new EventEmitter<Order>();

  previousPackagingQuantity: number = 0; // Initialize the previous quantity
  previousUnitQuantity: number = 0; // Initialize the previous unit quantity

  constructor(public orderService: OrdersService, public authService: AuthService) { }

  ngOnInit(): void { // Use OnInit lifecycle hook
    // Set previous quantities here after inputs are assigned
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

  // onModelChange(newValue: number) {
  //   console.log("Model change detected:");
  //   console.log("Previous unit quantity:", this.previousUnitQuantity);
  //   console.log("New value:", newValue);
  //   console.log("Current unit ordered quantity:", this.order.unitOrderedQuantity);

  //   this.order.unitOrderedQuantity = newValue; // Update the model
  // }

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
    this.isVisiblePa = false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showPackToastDiv = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
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
          // Update the previous quantity after successful edit
          this.previousPackagingQuantity = this.order.packagingOrderedQuantity;
          this.showPackToast();
        },
        error: badResponse => {
          console.log("Error updating packaging quantity:", badResponse);
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
    this.isVisibleUt = false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showUnitToastDiv = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  editUnitQuantity() {
    console.log("Edit unit quantity triggered");
    console.log("Current unit ordered quantity:", this.order.unitOrderedQuantity);
    console.log("Previous unit ordered quantity:", this.previousUnitQuantity);

    // checks if the value changed and if the orderId and the quantity are valid integers
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
          // Update the previous unit quantity after successful edit
          this.previousUnitQuantity = this.order.unitOrderedQuantity;
          this.showUnitToast();
        },
        error: badResponse => {
          console.log("Error updating unit quantity:", badResponse);
        }
      });
    } else {
      console.log("No changes in unit quantity, request not sent");
      this.order.unitOrderedQuantity = this.previousUnitQuantity;
    }
  }

  updateOrderArrival() 
  {
    // console.log("Changing arrived status from:", this.order.arrived);
    console.log("ORDER TO SEND", this.order);
    this.orderService.updateOrderArrivalDetails(this.order.id, this.order).subscribe({

      next: data => {
        // console.log("Arrived status updated successfully");
        // console.log(this.order.arrived)
        this.order = data;
        console.log("Arrived DATA", this.order)
        console.log(this.order.arrived)
        // this.order.arrived = !this.order.arrived;
      },
      error: badResponse => {
        console.log("Error updating arrived status:", badResponse);

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

  isPopoverVisible: boolean = false; // Property to manage popover visibility

  // Toggle the visibility of the popover
  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  // Close the popover when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const popoverElement = document.querySelector('.popoverConfirm'); // Make sure this matches the popover class

    // Check if the click target is outside the popover and the button
    if (popoverElement && !popoverElement.contains(buttonElement) && !buttonElement.closest('button')) {
      this.isPopoverVisible = false; // Close the popover
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
