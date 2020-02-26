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
    private postsUpdated = new Subject<Post[]>();
    getPosts() {
        debugger;
        this.client.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath
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

    addPost(title: string, content: string, image: File) {
        debugger;
        const postData = new FormData();
        postData.append("title", title)
        postData.append("content", content)
        postData.append("image", image);
        //const post: Post = { id: null, title: title, content: content };
        this.client.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe(postsData => {
                console.log(postsData)
                const post: Post = {
                    id: postsData.post.id,
                    title: title,
                    content: content,
                    imagePath: postsData.post.imagePath
                }

                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/'])
            })
    }


    deletePost(postId: string) {
        this.client.delete("http://localhost:3000/api/posts/" + postId)
            .subscribe(() => {
                debugger;
                const updatedposts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedposts;
                this.postsUpdated.next([...this.posts]);
            })
    }

    getPost(id: string) {
        return this.client.get<{ _id: string, title: string, content: string,imagePath:string }>("http://localhost:3000/api/posts/" + id);
    }

    updatePost(id: string, title: string, conten: string, image: File | string) {
        debugger;
        let postData;
        if (typeof (postData) == 'object') {
            const postData = new FormData();
            postData.append("id", id); 
            postData.append("title", title); 
            postData.append("content", conten);
            postData.append("image", image);
        } else {
            postData = {
                id: id,
                title: title,
                conten: conten,
                imagePath: image
            }
        }

        this.client.put("http://localhost:3000/api/posts/" + id, postData)
            .subscribe(response => {
                const updatedPost = [...this.posts];
                const oldPostIndex = updatedPost.findIndex(p => p.id === id);
                const post: Post = { id: id, title: title, content: conten, imagePath: "" };
                updatedPost[oldPostIndex] = post;
                this.posts = updatedPost;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            })
    }
}