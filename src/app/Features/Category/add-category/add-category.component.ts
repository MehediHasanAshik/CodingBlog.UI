import { Component } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { CategoryService } from '../Services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  displayAlert: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  OnSubmit() {
    // console.log(this.model);
    if (this.model.name == '' && this.model.urlHandle == '') {
      return;
    }

    this.addCategorySubscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (res) => {
          this.displayAlert = true;
          setTimeout(() => {
            this.displayAlert = false;
            this.router.navigate(['/admin/categories']);
          }, 2000);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
