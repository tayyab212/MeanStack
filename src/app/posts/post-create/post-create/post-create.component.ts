import { Component, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost;
  textArea;
  enterTitle;
  enterContent;
  private mode = 'create'
  private postId: string;
  private post: Post;
  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
        
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onAddPost(form: NgForm) {
    debugger;
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    }
    if(this.mode =='create'){

      this.postService.addPost(form.value.title, form.value.content)
    }else{
      this.postService.updatePost(this.postId,form.value.title, form.value.content)

    }

    form.reset();
  }



}
