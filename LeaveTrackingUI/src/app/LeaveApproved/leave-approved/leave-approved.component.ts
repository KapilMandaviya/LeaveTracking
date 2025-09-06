import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { NavigateUserDetailService } from 'src/app/Service/navigate-user-detail.service';
import { UtitlityServiceService } from 'src/app/Service/utitlity-service.service';
import { LeaveStatus } from 'src/app/model/model.model';

@Component({
  selector: 'app-leave-approved',
  templateUrl: './leave-approved.component.html',
  styleUrls: ['./leave-approved.component.css']
})
export class LeaveApprovedComponent implements OnInit {
  leaveStatusList: any = [];
  filterleaveStatusList: LeaveStatus[] = [];
  search: string = '';

  constructor(
    private toast: NgToastService,
    private Service: NavigateUserDetailService,
    private utitlity: UtitlityServiceService
  ) {}

  ngOnInit(): void {
    this.Service.leaveStatusList().subscribe((res: any) => {
      this.leaveStatusList = res;
      this.filterleaveStatusList = res;
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm.toLowerCase();
    if (this.search) {
      this.filterleaveStatusList = this.leaveStatusList.filter((x: LeaveStatus) => 
        x.name.toLowerCase().includes(this.search)
      );
    } else {
      this.filterleaveStatusList = this.leaveStatusList;
    }
  }

  approvedLeave(userId: any, leaveId: any) {
    let leave: LeaveStatus = {
      leaveType: "",
      startDate: "01-01-2000",
      endDate: "01-01-2000",
      leaveReason: "",
      dateOfReq: "01-01-2000",
      leaveId: leaveId,
      status: "Approved",
      name: "",
      userId: userId
    };
    
    this.Service.statusUpdate(leave).subscribe((res: any) => {
      if (res.message == "Record Approved") {
        this.toast.success({ detail: 'Success', summary: res.message, duration: 2000 });
        this.refreshLeaveList();
      } else {
        this.toast.error({ detail: 'Error', summary: res.message, duration: 2000 });
      }
    });
  }

  rejectedLeave(userId: any, leaveId: any) {
    let leave: LeaveStatus = {
      leaveType: "",
      startDate: "01-01-2000",
      endDate: "01-01-2000",
      leaveReason: "",
      dateOfReq: "01-01-2000",
      leaveId: leaveId,
      status: "Rejected",
      name: "",
      userId: userId
    };
    
    this.Service.statusUpdate(leave).subscribe((res: any) => {
      if (res.message == "Record Rejected") {
        this.toast.success({ detail: 'Success', summary: res.message, duration: 2000 });
        this.refreshLeaveList();
      } else {
        this.toast.error({ detail: 'Error', summary: res.message, duration: 2000 });
      }
    });
  }

  exportToExcel() {
    this.utitlity.exportToExcel('leaveList', 'leave_requests');
  }

  private refreshLeaveList() {
    this.Service.leaveStatusList().subscribe((res: any) => {
      this.leaveStatusList = res;
      this.filterleaveStatusList = res;
    });
  }
}