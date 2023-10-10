import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../blog-post/Models/blog-post.model';
import { BlogPostService } from '../../blog-post/Services/blog-post.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  url: string | null = null;
  blogPost?: BlogPost;

  constructor(private router: ActivatedRoute, private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: param => {
        if (param) {
          this.url = param.get('url');
        }
      }
    })

    //get the BlogPost Bu url
    if (this.url !== null) {
      this.blogPostService.getBlogPostByUrlHandle(this.url).subscribe({
        next: (res) => {
          if (res) {
            this.blogPost = res;
          }
        }
      })
    }
  }


}
