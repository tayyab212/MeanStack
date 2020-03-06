import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule,MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressBarModule, MatProgressSpinnerModule, MatPaginatorModule} from '@angular/material'
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header/header/header.component';
import { PostlistComponent } from './posts/postlist/postlist/postlist.component';
import { PostsService } from './posts/post.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login/login.component';
import { SigupComponent } from './Auth/Signup/sigup/sigup.component';
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostlistComponent,
    LoginComponent,
    SigupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
