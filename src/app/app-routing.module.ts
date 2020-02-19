import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import { PostlistComponent } from './posts/postlist/postlist/postlist.component';


const routes: Routes = [
 {path:"",component:PostlistComponent},
 {path:"create",component:PostCreateComponent},
 {path:"edit/:postId",component:PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
