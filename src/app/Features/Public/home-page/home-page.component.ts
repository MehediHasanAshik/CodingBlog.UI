import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/Services/blog-post.service';
import { BlogPost } from '../../blog-post/Models/blog-post.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  blogPosts: BlogPost[] = [];

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.blogPostService.getAllBlogPosts().subscribe({
      next: (res: any) => {
        if (res) {
          this.blogPosts = res;
        }
      }
    })
  }
}
