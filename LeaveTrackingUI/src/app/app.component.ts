import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtitlityServiceService } from './Service/utitlity-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public username = "";
  public userrole = "";
  private loginSub!: Subscription;

  constructor(
    public utility: UtitlityServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setUserInfo();

    // Subscribe to login status updates
    this.loginSub = this.utility.loginStatus$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.setUserInfo();
      } else {
        this.username = "";
        this.userrole = "";
      }
    });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  setUserInfo() {
    this.username = this.utility.getNameFromToken();
    this.userrole = this.utility.getRoleFromToken();
  }

  title = 'LeaveTrackingUI';

  signOut() {
    this.utility.signOut();
    this.utility.updateLoginStatus(false); // <-- notify logout
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
