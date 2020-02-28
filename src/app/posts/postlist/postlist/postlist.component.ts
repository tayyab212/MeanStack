import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../post.model';
import { PostsService } from '../../post.service';
import {Subscription } from "rxjs";
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit,OnDestroy {

private postSub :Subscription; 
 isloading =false;
    post: Post[] =[];
    totoalPost=0;
    postPerPage=2;
    pageSizeOption = [1,2,5,10];
    currentPage=1;
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isloading =true;
     this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.postSub= this.postsService.getPostsUpdateListener()
      .subscribe((postData:{posts:Post[] ,postCount :number}) => {
        debugger;
        this.post = postData.posts;
        this.totoalPost = postData.postCount;
       this.isloading=false;
      },
        error => {}
      );
  }

  onDelete(postId:string){
    debugger; 
    this.isloading = true;
    this.postsService.deletePost(postId)
    .subscribe(()=>{
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    });
  }

  ngOnDestroy(): void {
   this.postSub.unsubscribe();
  }
  onChanedPage(pageData:PageEvent){
    debugger;
    this.isloading =true;
    this.currentPage = pageData.pageIndex +1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }
}
