import { Subscription } from 'rxjs';
import { BlogPostService } from './../Services/blog-post.service';
import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../Models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts: BlogPost[] = [];

  getAllBlogPostSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.getAllBlogPostSubscription = this.blogPostService.getAllBlogPosts().subscribe({
      next: (res: any) => {
        this.blogPosts = res;
      },
      error: err => {
        console.log(err);

      }
    })
  }

  ngOnDestroy() {
    this.getAllBlogPostSubscription?.unsubscribe();
  }

}
