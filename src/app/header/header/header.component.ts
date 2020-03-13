import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
private authListenerSubs:Subscription;
userIsAuthenticated =false;
  constructor(private authSerive:AuthService) { }

  ngOnInit() {
    this.authListenerSubs=this.authSerive.getAuthStatusListener().subscribe(
      isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      }
    );
  }

  onLogout(){
  this.authSerive.onLogout();
  }
ngOnDestroy(){}
}
