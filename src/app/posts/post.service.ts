import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private client: HttpClient, private router: Router) {
    }
    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts:Post[],postCount:number}>();
    getPosts(postsPerPage:number,currentPage:number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`
        this.client.get<{ message: string, posts: any,maxPosts:number }>('http://localhost:3000/api/posts'+queryParams)
            .pipe(map((postData) => {
                return { post:postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath,
                        creator:post.creator
                    }
                }),maxPosts:postData.maxPosts};
            })
            )
            .subscribe(transferPostData => {
                debugger;
                console.log(transferPostData);
                this.posts = transferPostData.post;
                this.postsUpdated.next({posts:[...this.posts],postCount:transferPostData.maxPosts});
            });
    }


    getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string, image: File) {
        debugger;
        const postData = new FormData();
        postData.append("title", title)
        postData.append("content", content)
        postData.append("image", image);
        //const post: Post = { id: null, title: title, content: content };
        this.client.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe(postsData => {
                this.router.navigate(['/'])
            })
    }


    deletePost(postId: string) {
     return this.client.delete("http://localhost:3000/api/posts/" + postId);           
    }

    getPost(id: string) {
        return this.client.get<{ _id: string, title: string, content: string,imagePath:string }>("http://localhost:3000/api/posts/" + id);
    }

    updatePost(id: string, title: string, conten: string, image: File | string){
        debugger;
        let postData;
        if (typeof (image) == 'object') {
             postData = new FormData();
            postData.append("id", id); 
            postData.append("title", title); 
            postData.append("content", conten);
            postData.append("image", image);
        } else {
            postData = {
                id: id,
                title: title,
                conten: conten,
                image: image
            }
        }

        this.client.put("http://localhost:3000/api/posts/" + id, postData)
            .subscribe(response => {
                this.router.navigate(['/']);
            })
    }
}