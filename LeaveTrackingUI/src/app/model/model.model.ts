export class Role {
    roleId:number=0;
    roleName:string='';
}
export class User {
    userId:number=0;
    firstName:string="";
    lastName:string="";
    dateOfJoin:string="";
    address:string="";
    email:string="";
    phoneNo:string="";
    leaveBalance:number=0;
    extraDetail:string="";
    role:string="";
    password:string="";
    
}
export class LeaveStatus{
    name:string="";
        
    leaveId:number=0;
    userId:number=0;
    leaveType:string="";
    startDate:string="";
    endDate:string="";
    dateOfReq:string="";
    leaveReason:string="";
    status:string="";
}
