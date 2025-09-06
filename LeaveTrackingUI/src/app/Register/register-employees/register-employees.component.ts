import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { NgToastService } from 'ng-angular-popup';
import { NavigateUserDetailService } from 'src/app/Service/navigate-user-detail.service';
import { User } from 'src/app/model/model.model';

@Component({
  selector: 'app-register-employees',
  templateUrl: './register-employees.component.html',
  styleUrls: ['./register-employees.component.css']
})
export class RegisterEmployeesComponent implements OnInit{

  /**
   *
   */
  public registerForm!:FormGroup;
  constructor(private fb: FormBuilder,private toast:NgToastService,private navigate:NavigateUserDetailService)
   {
    
  }
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      employeeFirstName:['',Validators.required],
      employeeLasName:['',Validators.required],
      employeeDateJoin:['',Validators.required],
      employeeAddress:['',Validators.required],
      employeeEmail:['',Validators.compose([Validators.email,Validators.required])],
      employeeNumber:['',Validators.compose([Validators.maxLength(25),Validators.required])],
      employeeLeaveBalance:['',Validators.compose([Validators.maxLength(10),Validators.required])],
      employeeDetail:[''],
      userRole:['',Validators.required],
      employeePassword:['',Validators.compose([Validators.maxLength(2),Validators.required])]


  })
}

public isValidEmail!: boolean;
checkValidEmail(event: string) {
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}

  onRegister(){
   
    let employeeFirstName =this.registerForm.get('employeeFirstName')?.value;
    let employeeLasName =this.registerForm.get('employeeLasName')?.value;
    let employeeDateJoin =this.registerForm.get('employeeDateJoin')?.value;
    let employeeAddress =this.registerForm.get('employeeAddress')?.value;
    let employeeEmail =this.registerForm.get('employeeEmail')?.value;
    let employeeNumber =this.registerForm.get('employeeNumber')?.value;
    let employeeLeaveBalance =this.registerForm.get('employeeLeaveBalance')?.value;
    let employeeDetail =this.registerForm.get('employeeDetail')?.value;
    let userRole =this.registerForm.get('userRole')?.value;
    let employeePassword =this.registerForm.get('employeePassword')?.value;
    

    let user:User={
        userId:0,
        firstName:employeeFirstName,
        lastName:employeeLasName,
        dateOfJoin:employeeDateJoin,
        address:employeeAddress,
        email:employeeEmail,
        phoneNo:employeeNumber,
        leaveBalance:employeeLeaveBalance,
         extraDetail:employeeDetail,
        role:userRole,
        password:employeePassword
    };
    this.navigate.insertUser(user).subscribe((res:any)=>{
     
      if(res.message=="inserted")
     {
        this.toast.success({detail:'Success',summary:'Record inserted',duration:2000});
        this.registerForm.reset();
     }
     else{
      this.toast.error({detail:'Error',summary:res.message,duration:2000});
     }
    })
  }
}
