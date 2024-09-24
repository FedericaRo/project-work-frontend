export interface Product
{
  
  id: number;
  productName: string;
  unitPrice: number;
  unitType: string;
  unitTypeQuantity: number;
  packagingType: string;
  packagingTypeQuantity: number;
  unitsPerPackaging: number;
  categoryName: string;
  supplierName: string;
  reorderPoint: number;
  code:string;
}