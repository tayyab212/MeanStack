import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    this.userIsAuthenticated  = this.authSerive.getIsAuth();
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
