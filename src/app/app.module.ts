import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import {  FormsModule } from '@angular/forms';
import { MatCardModule,MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material'
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header/header/header.component';
import { PostlistComponent } from './posts/postlist/postlist/postlist.component';
import { PostsService } from './posts/post.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
