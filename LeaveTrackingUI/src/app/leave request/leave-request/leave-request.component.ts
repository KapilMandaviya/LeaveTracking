import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavigateUserDetailService } from 'src/app/Service/navigate-user-detail.service';
import { LeaveStatus } from 'src/app/model/model.model';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { UtitlityServiceService } from 'src/app/Service/utitlity-service.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveStatusListByUser: any = [];
  leaveStatus: boolean = false;
  leaveRequestForm!: FormGroup;
  today: string = '';
  maxEndDate: string = '';

  constructor(
    private toast: NgToastService,
    private utility: UtitlityServiceService,
    private service: NavigateUserDetailService,
    private date: DatePipe,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; // Format: yyyy-MM-dd

    this.leaveRequestForm = this.fb.group({
      selectLeaveType: ['', Validators.required],
      leaveStartDate: ['', [Validators.required, this.startDateValidator]],
      leaveEndDate: ['', Validators.required],
      leaveReason: ['', Validators.required]
    }, {
      validators: this.endDateValidator
    });

    // Watch for start date changes to calculate max end date
    this.leaveRequestForm.get('leaveStartDate')?.valueChanges.subscribe((startDate: string) => {
      if (startDate) {
        const start = new Date(startDate);
        start.setDate(start.getDate() + 5);
        this.maxEndDate = start.toISOString().split('T')[0]; // 5 days ahead
      } else {
        this.maxEndDate = '';
      }
    });

    this.service.leaveStatusListByUser().subscribe((res: any) => {
      this.leaveStatusListByUser = res;
    });
  }


  // ✅ Validator: Start date must be today or future
  startDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);
    if (selectedDate < today) {
      return { pastStartDate: true };
    }
    return null;
  }

  // ✅ Validator: End date must be >= start date and within 5 days
  endDateValidator(group: AbstractControl): ValidationErrors | null {
    const start = new Date(group.get('leaveStartDate')?.value);
    const end = new Date(group.get('leaveEndDate')?.value);

    if (!start || !end) return null;

    const maxEnd = new Date(start);
    maxEnd.setDate(start.getDate() + 5);

    if (end < start) {
      return { endBeforeStart: true };
    }
    if (end > maxEnd) {
      return { endTooFar: true };
    }
    return null;
  }

  calculateDateDiff(startdate: string) {
    const start = new Date(startdate);
    const request = new Date();
    const diff = Math.abs(request.getTime() - start.getTime());
    const daysdiff = Math.ceil(diff / (1000 * 3600 * 24));
    return daysdiff;
  }

  cancelleLeave(userId: number, leaveId: number) {
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

    this.service.statusUpdate(leave).subscribe((res: any) => {
      if (res.message == "Record Rejected") {
        this.toast.success({ detail: 'Success', summary: res.message, duration: 2000 });
        this.service.leaveStatusListByUser().subscribe((res: any) => {
          this.leaveStatusListByUser = res;
        });
      } else {
        this.toast.error({ detail: 'Error', summary: res.message, duration: 2000 });
      }
    });
  }

  LeaveRequest() {
    if (this.leaveRequestForm.invalid) return;

    let leave: LeaveStatus = {
      leaveType: this.leaveRequestForm.get('selectLeaveType')?.value,
      startDate: this.leaveRequestForm.get('leaveStartDate')?.value,
      endDate: this.leaveRequestForm.get('leaveEndDate')?.value,
      leaveReason: this.leaveRequestForm.get('leaveReason')?.value,
      dateOfReq: "01-01-2000",
      leaveId: 0,
      status: "",
      name: "",
      userId: Number(this.utility.getuserId())
    };

    this.service.LeaveRequestInsert(leave).subscribe((res: any) => {
      if (res.message == "inserted") {
        this.toast.success({ detail: 'Success', summary: 'Record inserted', duration: 2000 });
        this.leaveRequestForm.reset();
        this.service.leaveStatusListByUser().subscribe((res: any) => {
          this.leaveStatusListByUser = res;
        });
      } else {
        this.toast.error({ detail: 'Error', summary: res.message, duration: 2000 });
      }
    });
  }
}
