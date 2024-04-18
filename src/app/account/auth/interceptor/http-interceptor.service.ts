import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   

  
   
  
    // Sinon, ajouter le jeton d'authentification à l'en-tête de la requête
    const token = localStorage.getItem('token');
  
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return next.handle(authReq);
    } else {
      // Gérer le cas où le token n'est pas présent dans la local storage
      // Vous pouvez rediriger l'utilisateur vers la page de connexion, par exemple
      // ou gérer la situation d'une autre manière selon vos besoins
      console.log('Token not found in local storage');
      return next.handle(req);
    }
  }

}
