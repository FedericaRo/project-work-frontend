export interface Product
{
    id: number | null;
    category_id: number | null;
    supplier_id: number | null;
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
}