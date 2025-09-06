import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaveRequestComponent} from '../../src/app/leave request/leave-request/leave-request.component'
import {LeaveApprovedComponent} from '../app/LeaveApproved/leave-approved/leave-approved.component'
import {RegisterEmployeesComponent} from '../app/Register/register-employees/register-employees.component'
import {  employeeAuthGuard} from '../app/Auth-Guard/check-role.guard'
import { LoginDetailComponent} from '../app/Register/login-detail/login-detail.component'
import { UserAuthGuard } from './user-guard.guard';

const routes: Routes = [
{path:"LeaveRequest",component:LeaveRequestComponent,canActivate:[UserAuthGuard]},

{path:"leaveapproved",component:LeaveApprovedComponent,canActivate:[employeeAuthGuard] },

{path:"registeruser",component:RegisterEmployeesComponent,canActivate:[employeeAuthGuard] },

{path:'',component:LoginDetailComponent },
{path:"login",component:LoginDetailComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
