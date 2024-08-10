import { AbstractControl, ValidatorFn } from "@angular/forms";

export function integerValidator(): ValidatorFn{
        return (control:AbstractControl):{[key:string]:any} | null =>
        {
            let value = control.value;

            // Check if value is not a number
            if (isNaN(value) || !Number.isInteger(Number(value))) {
                return { 'notInteger': "La quantità da ordinare deve essere un numero intero" };
            }


            return null;
        }
}