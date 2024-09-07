import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  
  // Recupera il token dal localStorage
  let token = window.location.href.toString() != '/auth/login' ? localStorage.getItem('token') : 'token_a_caso';

  const router = inject(Router);

  if (token && token.includes('.')) {
    try {
      // Decodifica il payload del token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
  
      // Confronta con il tempo corrente
      const now = Math.floor(Date.now() / 1000); // Tempo corrente in secondi
      if (now >= expiry) 
      {
        router.navigate(['/tokenExpired'])
      } 
      else {
        console.log('Il token è ancora valido.');
      }
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
    }
  } else {
        
  }

  // Se esiste un token, aggiungilo all'intestazione della richiesta
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      // Se il server risponde con un errore 401 (non autorizzato), reindirizza l'utente alla pagina di login
      if (error.status === 410) {
        router.navigate(['/tokenExpired']);
      }

      if (error.status === 403) {
        router.navigate(['/forbidden']);
      }

      return throwError(() => error);
    })
  );
};