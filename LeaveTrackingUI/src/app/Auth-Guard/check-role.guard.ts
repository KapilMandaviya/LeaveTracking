import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { NavigateUserDetailService } from '../Service/navigate-user-detail.service';
import { Injectable } from '@angular/core';
import { UtitlityServiceService } from '../Service/utitlity-service.service';

@Injectable({
  providedIn:'root'
})

export class employeeAuthGuard implements CanActivate
{ 

  constructor(private utility:UtitlityServiceService,private Service:NavigateUserDetailService,
    private route:Router
    
    ){}
  canActivate():boolean {
    if(this.utility.IsLogin())
    {
      if(this.utility.userpayload.role=="admin" && this.utility.IsLogin()){
    
        return true
      }
      else{
        this.route.navigate(['login']);
        this.utility.signOut();
        return false
      }
   }
    else{
      this.route.navigate(['login']);
      return false
    }
  }
  
}
