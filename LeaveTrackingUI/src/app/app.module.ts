import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequestComponent } from './leave request/leave-request/leave-request.component';
import { RegisterEmployeesComponent } from './Register/register-employees/register-employees.component';
import { LoginDetailComponent } from './Register/login-detail/login-detail.component';
  
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LeaveApprovedComponent } from './LeaveApproved/leave-approved/leave-approved.component'
import{ HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http'
import { DatePipe } from '@angular/common';
import { TokenInterceptorInterceptor } from './Interceptor/token-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LeaveRequestComponent,
    RegisterEmployeesComponent,
    LoginDetailComponent,
    LeaveApprovedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    HttpClientModule
  ],

  providers: [DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
