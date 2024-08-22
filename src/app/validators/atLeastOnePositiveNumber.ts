import { AbstractControl, ValidatorFn } from "@angular/forms";

export function atLeastOnePositiveNumber(): ValidatorFn{
        return (control:AbstractControl):{[key:string]:any} | null =>
        {
            const controls = control.value;
            console.log(controls)
            let hasPositiveNumber = false;
        
            // Itera su tutti i controlli del form
            for (let key in controls) {
              if (controls[key] > 0 || controls.key != null) {
                console.log(controls[key])
                hasPositiveNumber = true;
                break;
              }
            }
        
            return hasPositiveNumber ? null : { atLeastOnePositiveNumber: true };
        }
}