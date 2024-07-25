import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


/**
 * Qui prendiamo il token del login e lo aggiungiamo all'header di ogni request che faremo 
 * così che il nostro backend possa autenticarci
 * @param req 
 * @param next 
 * @returns 
 */
export const AuthInterceptor:HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>  =>
{
    
    let token = localStorage.getItem("token");

    if(token)
    {

        req = req.clone({
            setHeaders:{Authorization: 'Bearer '+token}
        });
    }

    return next(req);//vai avanti poi normalmente
    
}