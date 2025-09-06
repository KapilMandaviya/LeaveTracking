import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigateUserDetailService } from 'src/app/Service/navigate-user-detail.service';
import { LeaveStatus, User } from 'src/app/model/model.model';
import {DatePipe} from '@angular/common'
import { NgToastService } from 'ng-angular-popup';
import { UtitlityServiceService } from 'src/app/Service/utitlity-service.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  leaveStatusListByUser:any=[];
  leaveStatus:boolean=false;
  leavedaycount:number[]=[];
  leaveRequestForm!:FormGroup;
  constructor(private toast:NgToastService,private utility:UtitlityServiceService,private Service:NavigateUserDetailService,private date:DatePipe,private fb:FormBuilder) {
  }
  ngOnInit(): void {

    this.leaveRequestForm=this.fb.group({
      selectLeaveType:['',Validators.required],
      leaveStartDate:['',Validators.required],
      leaveEndDate:['',Validators.required],
      leaveReason:['',Validators.required]

    })

    this.Service.leaveStatusListByUser().subscribe((res:any)=>{
      this.leaveStatusListByUser=res;
       })
  }
  calculateDateDiff(startdate:string)
  {
    const start=new Date(startdate);
    const request =new Date();

    const diff= Math.abs(request.getTime()-start.getTime());
    const daysdiff=Math.ceil(diff/(1000*3600*24));
    return daysdiff;
  } 

  cancelleLeave(userId:number,leaveId:number)
  {
    let leave:LeaveStatus={
      leaveType:"",
      startDate:"01-01-2000",
      endDate:"01-01-2000",
      leaveReason:"",
      dateOfReq:"01-01-2000" ,
      leaveId:leaveId,
      status:"Rejected",
      name:"",
      userId:userId
    
  };
    this.Service.statusUpdate(leave).subscribe((res:any)=>{
      if(res.message=="Record Rejected")
      {
         this.toast.success({detail:'Success',summary:res.message,duration:2000});
         this.Service.leaveStatusListByUser().subscribe((res:any)=>{
          this.leaveStatusListByUser=res;
        })
        }
      else{
       this.toast.error({detail:'Error',summary:res.message,duration:2000});
      }
     })
  }
  LeaveRequest(){
    let selectLeaveType =this.leaveRequestForm.get('selectLeaveType')?.value;
    let leaveStartDate =this.leaveRequestForm.get('leaveStartDate')?.value;
    let leaveEndDate =this.leaveRequestForm.get('leaveEndDate')?.value;
    let leaveReason =this.leaveRequestForm.get('leaveReason')?.value;
   let leave:LeaveStatus={
        leaveType:selectLeaveType,
        startDate:leaveStartDate,
        endDate:leaveEndDate,
        leaveReason:leaveReason,
        dateOfReq:"01-01-2000" ,
        leaveId:0,
        status:"",
        name:"",
        userId:Number(this.utility.getuserId())
    };
    this.Service.LeaveRequestInsert(leave).subscribe((res:any)=>{
     if(res.message=="inserted")
     {
        this.toast.success({detail:'Success',summary:'Record inserted',duration:2000});
        this.leaveRequestForm.reset();
        this.Service.leaveStatusListByUser().subscribe((res:any)=>{
          this.leaveStatusListByUser=res;
           })
     }
     else{
      this.toast.error({detail:'Error',summary:res.message,duration:2000});
     }
    })

  }
}
