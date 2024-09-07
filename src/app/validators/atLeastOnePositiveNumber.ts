import { AbstractControl, ValidatorFn } from "@angular/forms";

export function atLeastOnePositiveNumber(): ValidatorFn{
        return (control:AbstractControl):{[key:string]:any} | null =>
        {
            const unitOrderedQuantity = control.get('unitOrderedQuantity')?.value;
            const packagingOrderedQuantity = control.get('packagingOrderedQuantity')?.value;

            if ((unitOrderedQuantity <= 0 || unitOrderedQuantity == null) &&
                (packagingOrderedQuantity <= 0 || packagingOrderedQuantity == null)) {
                    console.log("here")
                return { atLeastOnePositiveNumber: true };
            }

            return null;
    };
}