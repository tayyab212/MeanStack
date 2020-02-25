import { Component, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public post: Post;
  isloading = false;
  postForm: FormGroup;
  constructor(private postService: PostsService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    this.postForm = this.fb.group({
      'title': ["", [Validators.required, Validators.minLength(3)]],
      'content': ["", [Validators.required]],
      'image':["",[Validators.required]]
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = { id: postData._id, title: postData.title, content: postData.content };
          this.postForm.setValue({
           title:this.post.title,
           content:this.post.content 
          })
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })

  }

  onAddPost() {
    debugger;
    if (this.postForm.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: this.postForm.value.title,
      content: this.postForm.value.content,
    
    }
    this.isloading = true;
    if (this.mode == 'create') {
      this.postService.addPost(this.postForm.value.title, this.postForm.value.content)
    } else {
      this.postService.updatePost(this.postId, this.postForm.value.title, this.postForm.value.content)
    }
    this.postForm.reset();
  }

  get title() { return this.postForm.get('title'); }

  get content() {return this.postForm.get('content');}
  url: any;
  onSelectFile(event) {
    debugger;                // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
  }

}
