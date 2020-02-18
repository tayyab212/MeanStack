import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn:'root'})
export class PostsService {
    constructor(private client :HttpClient){
    }
 private  posts: Post[] =[];
 private postsUpdated = new Subject<Post[]>();
 getPosts(){
     debugger;
   this.client.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts')
   .subscribe(postData =>{
       debugger;
       this.posts =postData.posts;
       this.postsUpdated.next([...this.posts]);
   });
 }


 getPostsUpdateListener() {
     return this.postsUpdated.asObservable();
 }

addPost(title:string, content :string){
     debugger;
     const post: Post = {Id:null,title :title ,content:content};
     this.posts.push(post);
     this.postsUpdated.next([...this.posts]);
 }
}