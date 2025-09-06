import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NavigateUserDetailService } from '../../Service/navigate-user-detail.service'
import { NgToastService } from 'ng-angular-popup';
import { UtitlityServiceService } from 'src/app/Service/utitlity-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.css']
})
export class LoginDetailComponent implements OnInit {


  public showPassword: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private navigate: NavigateUserDetailService, private toast: NgToastService, private utility: UtitlityServiceService) {

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      useremail: ['', Validators.compose([Validators.email, Validators.required])],
      userpassword: ['', Validators.compose([Validators.maxLength(25), Validators.required])]

    })

  }
  public loginForm!: FormGroup;

  login() {
    if (this.loginForm.valid) {
      this.loginForm.get('userpassword')?.value;

      this.navigate.userLogin(this.loginForm.get('useremail')?.value,
        this.loginForm.get('userpassword')?.value).subscribe((res: any) => {
          this.navigate.userDetail = res.userDetail;
          if (res.userDetail.userId != 0) {
            this.loginForm.reset();
            this.toast.success({ detail: "Success", summary: res.message, duration: 2000 })
            this.utility.setToken(res.token);
            this.utility.updateLoginStatus(true);
            this.utility.setuserId(res.userDetail.userId);
            const tokenPayload = this.utility.decodeTokens();
            this.utility.userpayload = tokenPayload;
          }
          else {
            this.toast.error({ detail: "error", summary: res.message, duration: 2000 })
          }

        })
    }

  }

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
