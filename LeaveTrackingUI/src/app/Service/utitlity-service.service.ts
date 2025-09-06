import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class UtitlityServiceService implements OnInit
 {

  public userpayload:any;
  ngOnInit(){
  
    this.userpayload=this.decodeTokens();
    }
  

  constructor(private route:Router) { 
    this.userpayload=this.decodeTokens();
   }
  
  signOut(){
    localStorage.clear();
    this.route.navigate(['login']);
   
  }
  setuserId(userId:string){
    localStorage.setItem('userId',userId);
  }
  getuserId(){
    return localStorage.getItem('userId');
  }
  setToken(tokenvalue:string){
    localStorage.setItem('token',tokenvalue);

  }
  getToken(){
    return localStorage.getItem('token');
  }
  public IsLogin():boolean{
    return !!localStorage.getItem('token');
  }
  
  decodeTokens()
  {
    const jwthelper=new JwtHelperService();
    const token=this.getToken()!;
    return jwthelper.decodeToken(token);
  }
  
  getRoleFromToken(){
    if(this.userpayload)
      return this.userpayload.role;
  }

  getNameFromToken(){
    if(this.userpayload)
      return this.userpayload.unique_name;
  }


  exportToExcel(tableId: string, fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById(tableId));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    
  }

  // Add this to UtitlityServiceService
private loginStatusSubject = new BehaviorSubject<boolean>(this.IsLogin());
loginStatus$ = this.loginStatusSubject.asObservable();
  
updateLoginStatus(status: boolean) {
  this.userpayload = this.decodeTokens(); // <-- update payload
  this.loginStatusSubject.next(status);
}

}