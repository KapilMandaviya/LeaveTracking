import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigateUserDetailService } from '../Service/navigate-user-detail.service';
import { NgToastService } from 'ng-angular-popup';
import { UtitlityServiceService } from '../Service/utitlity-service.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private service:NavigateUserDetailService,private utility:UtitlityServiceService,private toast:NgToastService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mytoken=this.utility.getToken();
    //This Type Working
    if(mytoken){
    request=request.clone({
        setHeaders:{Authorization:`Bearer ${mytoken}`}
     })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status===401)
          {
              this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
              this.router.navigate(['login'])

          }
        }
        return throwError(()=>new Error("Some Internal Error Generate"))
      })
    )}
  }    
