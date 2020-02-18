import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../post.model';
import { PostsService } from '../../post.service';
import {Subscription } from "rxjs";
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit,OnDestroy {

private postSub :Subscription; 
 
    post: Post[] =[];
  constructor(private postsService: PostsService) {

  }

  ngOnInit() {
     this.postsService.getPosts();
    this.postSub= this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.post = posts;
      },
        error => {

        }
      );
  }

  onDelete(postId:string){
    debugger; 
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
   this.postSub.unsubscribe();
  }

}
