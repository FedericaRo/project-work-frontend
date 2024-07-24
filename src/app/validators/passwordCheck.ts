import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordMatchCheck(passwordControlName:string,passwordConfirmationControlName:string): ValidatorFn{
        return (control:AbstractControl):{[key:string]:any} | null =>
        {
            let password = control.get(passwordControlName)?.value;
            let passwordConfirmation = control.get(passwordConfirmationControlName)?.value;

            if(password != passwordConfirmation)
                return {'passwordNotMatch': "Password and password confirmation must match"};

            return null;
        }
}