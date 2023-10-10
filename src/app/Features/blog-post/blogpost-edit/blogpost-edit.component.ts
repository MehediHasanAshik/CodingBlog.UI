import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../Models/blog-post.model';
import { CategoryService } from '../../Category/Services/category.service';
import { Category } from '../../Category/Models/Category.model';
import { UpdateBlogPost } from '../Models/update-blog-post';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css'],
})
export class BlogpostEditComponent implements OnInit, OnDestroy {
  id: string | null = null;
  isImageSelectorVisible: boolean = false;

  blogPosts?: BlogPost;
  categories?: Category[];
  selectedCategories?: string[];

  routeSubscription?: Subscription;
  getCategorySubscription?: Subscription;
  getSingleBlogPostSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //get all available category
    this.getCategorySubscription = this.categoryService.getAllCategories().subscribe({
      next: res => {
        if (res) {
          this.categories = res;
        }
      }
    })

    //Extract the parameter from URL
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params) {
          this.id = params.get('id');
        }
      }
    );

    //load single blog post by id
    if (this.id) {
      this.getSingleBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
        next: (res) => {
          if (res) {
            this.blogPosts = res;
            this.selectedCategories = res.categories.map(x => x.id);
          }
        },
      });
    }

    //selectImage behavioral Subject 
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: res => {
        if (this.blogPosts) {
          this.blogPosts.featuredImageUrl = res.url;
          this.isImageSelectorVisible = false;
        }
      }
    })
  }

  onFormUpdate() {
    if (this.id && this.blogPosts) {
      var updatedBlogPost: UpdateBlogPost = {
        title: this.blogPosts.title,
        author: this.blogPosts.author,
        content: this.blogPosts.content,
        shortDescription: this.blogPosts.shortDescription,
        featuredImageUrl: this.blogPosts.featuredImageUrl,
        isVisible: this.blogPosts.isVisible,
        publishedDate: this.blogPosts.publishedDate,
        urlHandle: this.blogPosts.urlHandle,
        categories: this.selectedCategories ?? []
      }
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updatedBlogPost).subscribe({
        next: res => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: res => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  onClickClose(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getCategorySubscription?.unsubscribe();
    this.getSingleBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
