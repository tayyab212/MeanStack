import { Component, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../post.service';
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
  constructor(private postService :PostsService) 
  { }

  ngOnInit() {
  }

  onAddPost(form : NgForm) {
    debugger;
    if(form.invalid)
    {
      return;
    }
    const post :Post = {
      Id:null,
      title: form.value.title,
      content: form.value.content
    }    
    this.postService.addPost(form.value.title,form.value.content)
    form.reset();
  }

}
