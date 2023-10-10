import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../Models/BlogPost.model';
import { BlogPostService } from '../Services/blog-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../Category/Services/category.service';
import { Category } from '../../Category/Models/Category.model';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';

@Component({
  selector: 'app-blog-post-add',
  templateUrl: './blog-post-add.component.html',
  styleUrls: ['./blog-post-add.component.css'],
})
export class BlogPostAddComponent implements OnInit {
  model: AddBlogPost;
  displayAlert: boolean = false;
  addBlogPostSubscription?: Subscription;
  getCategorySubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  categories: Category[] = [];

  isImageSelectorVisible: boolean = false;

  constructor(
    private blogPostService: BlogPostService,
    private imageService: ImageService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    };
  }

  ngOnInit(): void {
    this.getCategorySubscription = this.categoryService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
      });


      //Subscribe to select image behavioral subject
      this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
        next: res => {
          this.model.featuredImageUrl = res.url;
          this.isImageSelectorVisible = false;
        }
      })
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  onFormSubmit(): void {
    console.log(this.model);
    if (
      this.model.title === '' ||
      this.model.shortDescription === '' ||
      this.model.urlHandle === '' ||
      this.model.content === '' ||
      this.model.featuredImageUrl === '' ||
      this.model.author === ''
    ) {
      return;
    }
    this.addBlogPostSubscription = this.blogPostService
      .addBlogPosts(this.model)
      .subscribe({
        next: (res) => {
          this.displayAlert = true;
          setTimeout(() => {
            this.displayAlert = false;
            this.router.navigate(['/admin/blogposts']);
          }, 2000);
        },
      });
  }

  onClickClose(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.getCategorySubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
