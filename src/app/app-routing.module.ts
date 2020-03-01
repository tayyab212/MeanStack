import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import { PostlistComponent } from './posts/postlist/postlist/postlist.component';
import { LoginComponent } from './auth/login/login/login.component';


const routes: Routes = [
 {path:"",component:PostlistComponent},
 {path:"create",component:PostCreateComponent},
 {path:"edit/:postId",component:PostCreateComponent},
 {path:"login",component:LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
