import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import { PostlistComponent } from './posts/postlist/postlist/postlist.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SigupComponent } from './Auth/Signup/sigup/sigup.component';
import { AuthGuard } from './Auth/auth-guard';


const routes: Routes = [
 {path:"",component:PostlistComponent},
 {path:"create",component:PostCreateComponent,canActivate:[AuthGuard]},
 {path:"edit/:postId",component:PostCreateComponent,canActivate:[AuthGuard]},
 {path:"login",component:LoginComponent } ,
 {path:"signup",component:SigupComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
