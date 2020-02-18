import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private client: HttpClient) {
    }
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    getPosts() {
        debugger;
        this.client.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    }
                })
            }))
            .subscribe(transferPost => {
                debugger;
                this.posts = transferPost;
                this.postsUpdated.next([...this.posts]);
            });
    }


    getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { Id: null, title: title, content: content };
        this.client.post<{ message: string }>('http://localhost:3000/api/posts', post)
            .subscribe(postsData => {
                console.log(postsData.message)
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            })
    }


    deletePost(postId:string){
        this.client.delete("http://localhost:3000/api/posts/"+postId)
        .subscribe(()=>{
            console.log("deleted");
        })
    }
}