import { Component, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostsService } from '../../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import  {mimeType} from '../../../../Validators/mime-type.valiator'
import { async } from '@angular/core/testing';
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
  imagepreview :any;
  constructor(private postService: PostsService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    this.postForm = this.fb.group({
      'title': ["", [Validators.required, Validators.minLength(3)]],
      'content': ["", [Validators.required]],
    image: new FormControl(null,{
     validators:[Validators.required],
     asyncValidators:[mimeType]
    })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          debugger;
          this.post = { id: postData._id, title: postData.title, content: postData.content,imagePath:postData.imagePath };
          this.postForm.setValue({
           title:this.post.title,
           content:this.post.content,
           image:this.post.imagePath
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
     imagePath:null
    }
    this.isloading = true;
    if (this.mode == 'create') {
      this.postService.addPost(this.postForm.value.title, this.postForm.value.content,this.postForm.value.image)
    } else {
      this.postService.updatePost(this.postId, this.postForm.value.title, this.postForm.value.content,this.postForm.value.image)
    }
    this.postForm.reset();
  }

  get title() { return this.postForm.get('title'); }

  get content() {return this.postForm.get('content');}
  url: any;
  onSelectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image:file})
    this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagepreview = reader.result;
    }
    reader.readAsDataURL(file);
  }
}
