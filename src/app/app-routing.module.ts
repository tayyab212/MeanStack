import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';


const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
