export interface Order {
    id: number;
    productCode: string;
    supplierName: string;
    productName: string;
    orderDate: string; 
    deliverDate: string;

    unitOrderedQuantity: number;
    unitType: string;
    
    packagingOrderedQuantity: number;
    packagingType: string;

    arrived:boolean;
}