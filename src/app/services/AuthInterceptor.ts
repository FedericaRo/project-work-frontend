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
        router.navigate(['/auth/login']);

        window.location.href = "/auth/login";
        // alert('Sessione scaduta. Riprova ad effettuare il login.');
      } 
      else {
        console.log('Il token è ancora valido.');
      }
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      // Gestisci eventuali errori nella decodifica del token
      router.navigate(['/auth/login']);

    }
  } else {
        
    // Gestisci il caso in cui il token non è presente o non valido
  }

  // Se esiste un token, aggiungilo all'intestazione della richiesta
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);//vai avanti poi normalmente

  // // Passa la richiesta al prossimo handler
  // return next(req).pipe(
  //   catchError((error) => {
  //     // Se il server risponde con un errore 401 (non autorizzato), reindirizza l'utente alla pagina di login
  //     if (error.status === 401) {
        
  //       // Opzionale: mostra un messaggio all'utente
  //       // alert('Sessione scaduta. Riprova ad effettuare il login.');
  //       // window.location.href = '/auth/login';
  //     }

  //   //   if(window.location.toString() != '/auth/login')
  //   //   {
  //   //       if(!token || !expiry || (Math.floor(new Date().getTime() / 1000)) >= expiry)
  //   //       {
  //   //         alert('sessione scaduta, riesegui il login!')
  //   //         window.location.href = '/auth/login';
  //   //       }
  //   //   }
  //     // Rilancia l'errore per gestirlo più in alto nella catena di chiamate

  //     const err = new Error(error); 
  //     console.log(error);
  //     return throwError(() => err);
  //   })
  // );
};
