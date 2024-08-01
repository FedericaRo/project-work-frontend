export interface Product
{
  
  id: number | null;
  // category_id: number | null; //! Non siamo sicuri se abbia senso averceli sia qui che nel back
  // supplier_id: number | null; //! Non siamo sicuri se abbia senso averceli sia qui che nel back
  productName: string;
  unitPrice: number;
  unitType: string;
  unitTypeQuantity: number;
  packagingType: string;
  packagingTypeQuantity: number;
  unitsPerPackaging: number;
  categoryName: string;
  supplierName: string;
  supplierCode: string;
  reorderPoint: number;
}