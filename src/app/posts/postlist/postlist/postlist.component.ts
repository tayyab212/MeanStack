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
  // post =[
  //   {title :"First post", content:"this is first post"},
  //   {title :"second post", content:"this is first post"},
  //   {title :"third post", content:"this is first post"},
  //   {title :"four post", content:"this is first post"},
  // ]
  @Input() post: Post[] = [];
  constructor(private postsService: PostsService) {
    debugger;
  }

  ngOnInit() {
    //this.post = this.postsService.getPosts();
    this.postSub= this.postsService.getPostsUpdateListener()
      .subscribe((post: Post[]) => {
        this.post = post;
      },
        error => {

        }
      );
  }


  ngOnDestroy(): void {
   this.postSub.unsubscribe();
  }

}
