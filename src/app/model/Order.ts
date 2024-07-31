export interface Order {
    id: number;
    supplierCode: string;
    supplierName: string;
    productName: string;
    orderDate: string; // In TypeScript, dates are typically represented as strings in ISO format

    unitOrderedQuantity: number;
    unitType: string;
    
    packagingOrderedQuantity: number;
    packagingType: string;

    hasArrived:boolean;


    // unitDeliveredQuantity: number;
    // packagingDeliveredQuantity: number;
    // deliverDate: string;

    // productId: number;
    // unitPrice: number;
    // unitTypeQuantity: number;
    // packagingTypeQuantity: number;
    // unitsPerPackaging: number;

    // categoryId: number;
    // categoryName: string;

    // supplierId: number;
}