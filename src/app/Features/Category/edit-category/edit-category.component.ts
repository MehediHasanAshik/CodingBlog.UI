import { UpdateCategoryRequest } from './../Models/UpdateCategoryRequest';
import { Component, OnInit } from '@angular/core';
import { Category } from '../Models/Category.model';
import { CategoryService } from '../Services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  displayAlert: boolean = false;
  isDeleted: boolean = false

  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;

  category?: Category;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    //Get the Id from parameter
    this.paramSubscription = this.activatedRoute.paramMap.subscribe({
      next: params => {
        this.id = params.get('id')
      }
    });

    //Get the single category
    if (this.id) {
      this.categoryService.getCategory(this.id).subscribe({
        next: res => {
          this.category = res;
        }
      })
    }

  }

  OnUpdate() {
    const updatedCategory: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    if (updatedCategory && this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updatedCategory).subscribe({
        next: res => {
          this.displayAlert = true;
          setTimeout(() => {
            this.displayAlert = false;
            this.router.navigate(['/admin/categories']);
          }, 2000);
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  OnDelete(): void {
    if (this.id) {
      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id).subscribe({
        next: res => {
          this.isDeleted = true;
          setTimeout(() => {
            this.isDeleted = false;
            this.router.navigate(['/admin/categories']);
          }, 2000);
        },
        error: err => {
          console.log(err);
          
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
