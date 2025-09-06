import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LeaveStatus, User } from '../model/model.model'
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { UtitlityServiceService } from './utitlity-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateUserDetailService {


userDetail:User=new User();


private url="LeaveTrackig";

   
  constructor(private http:HttpClient,private utility:UtitlityServiceService) { }

  public userLogin(username:string,password:string)
  {
    return this.http.post(`${environment.apiUrl}/${this.url}/authenticateLogin`,{Email:username,Password:password})
  
  }
  public LeaveRequestInsert(leaveStatus:LeaveStatus)
  {
    console.log(leaveStatus);
    return this.http.post(`${environment.apiUrl}/${this.url}/LeaveRequestInsert`,leaveStatus)
  
  }

  public leaveStatusList():Observable<LeaveStatus[]>
  {
    return this.http.get<LeaveStatus[]>(`${environment.apiUrl}/${this.url}/getLeveStatusList`)
  
  }
  public insertUser(user:User)
  {
    return this.http.post(`${environment.apiUrl}/${this.url}/SubmitUser`,user)
  
  }

  public leaveStatusListByUser():Observable<LeaveStatus[]>
  {
    console.log(Number(this.utility.getuserId()));
    return this.http.get<LeaveStatus[]>(`${environment.apiUrl}/${this.url}/getLeveStatusListByUser/${Number(this.utility.getuserId())}`)
    
    
  }
  public statusUpdate(leave:LeaveStatus )
  {
    return this.http.post(`${environment.apiUrl}/${this.url}/LeaveApproveOrRejectUpdate`,leave);
    
  }
}
